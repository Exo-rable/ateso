import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { ALL_INTERESTS, PROGRAMMES } from "./interests";

const InterestSet = new Set<string>(ALL_INTERESTS);
const ProgrammeSet = new Set<string>(PROGRAMMES);

export const RegistrationInput = z.object({
  fullName: z.string().trim().min(2).max(100),
  lpuRegNo: z
    .string()
    .trim()
    .regex(/^\d{8,11}$/u, { message: "LPU registration number must be 8–11 digits" }),
  email: z.string().trim().toLowerCase().email().max(150),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/u, { message: "Phone must be 10 digits" }),
  programme: z.string().refine((v) => ProgrammeSet.has(v), { message: "Invalid programme" }),
  semester: z.number().int().min(1).max(10),
  section: z.string().trim().max(20).optional().or(z.literal("")),
  interestTags: z
    .array(z.string())
    .min(1, { message: "Pick at least one interest" })
    .max(40)
    .refine((arr) => arr.every((t) => InterestSet.has(t)), {
      message: "Unknown interest selected",
    }),
});

export type RegistrationInputT = z.infer<typeof RegistrationInput>;

export type RegistrationResult =
  | {
      ok: true;
      queuePosition: number;
      studentId: string;
      fullName: string;
    }
  | {
      ok: false;
      code: "duplicate_reg" | "duplicate_email" | "validation" | "server_error";
      message: string;
    };

/**
 * Atomic First-Come-First-Serve registration.
 *
 * - The `queue_position` column is a Postgres BIGSERIAL — every INSERT
 *   gets a strictly monotonic position from the sequence, server-side,
 *   regardless of how many clients submit at once.
 * - `lpu_reg_no` and `email` are UNIQUE; duplicates are rejected by the DB.
 * - Timestamp `joined_at` is server-set (DEFAULT now()), so clients can't fake order.
 */
export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RegistrationInput.parse(data))
  .handler(async ({ data }): Promise<RegistrationResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("students")
      .insert({
        lpu_reg_no: data.lpuRegNo,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        programme: data.programme,
        semester: data.semester,
        section: data.section || null,
        interest_tags: data.interestTags,
      })
      .select("id, queue_position, full_name")
      .single();

    if (error) {
      // Postgres unique violation = 23505
      const code = (error as { code?: string }).code;
      const msg = (error.message || "").toLowerCase();
      if (code === "23505") {
        if (msg.includes("lpu_reg_no")) {
          return {
            ok: false,
            code: "duplicate_reg",
            message: "This LPU registration number is already registered with ATESO.",
          };
        }
        if (msg.includes("email")) {
          return {
            ok: false,
            code: "duplicate_email",
            message: "An ATESO account already exists for this email.",
          };
        }
      }
      console.error("[registration] insert failed", error);
      return {
        ok: false,
        code: "server_error",
        message: "Something went wrong on our side. Please try again.",
      };
    }

    return {
      ok: true,
      studentId: inserted.id,
      queuePosition: Number(inserted.queue_position),
      fullName: inserted.full_name,
    };
  });
