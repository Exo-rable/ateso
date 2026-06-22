import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { DOMAINS } from "./team";

const DomainLabels = DOMAINS.map((d) => d.label) as [string, ...string[]];

export const ApplicationInput = z.object({
  domain: z.enum(DomainLabels),
  role: z.enum(["Lead", "Member"]),
  fullName: z.string().trim().min(2).max(100),
  lpuRegNo: z.string().trim().regex(/^\d{8,11}$/u, { message: "LPU reg no must be 8–11 digits" }),
  email: z.string().trim().toLowerCase().email().max(150),
  phone: z.string().trim().regex(/^\d{10}$/u, { message: "Phone must be 10 digits" }),
  programme: z.string().trim().max(100).optional().or(z.literal("")),
  semester: z.number().int().min(1).max(10).optional(),
  why: z.string().trim().max(1500).optional().or(z.literal("")),
  portfolioUrl: z.string().trim().url().max(300).optional().or(z.literal("")),
});

export type ApplicationInputT = z.infer<typeof ApplicationInput>;

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ApplicationInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("applications").insert({
      domain: data.domain,
      role: data.role.toLowerCase(),
      full_name: data.fullName,
      lpu_reg_no: data.lpuRegNo,
      email: data.email,
      phone: data.phone,
      programme: data.programme || null,
      semester: data.semester ?? null,
      why: data.why || null,
      portfolio_url: data.portfolioUrl || null,
    });

    if (error) {
      console.error("[applications] insert failed", error);
      return { ok: false as const, message: "Could not submit application." };
    }
    return { ok: true as const };
  });
