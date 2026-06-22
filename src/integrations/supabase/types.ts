export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          description: string
          id: string
          points_awarded: number
          student_id: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          points_awarded?: number
          student_id: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          points_awarded?: number
          student_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          domain: string
          email: string
          full_name: string
          id: string
          lpu_reg_no: string
          phone: string
          portfolio_url: string | null
          programme: string | null
          role: string
          semester: number | null
          why: string | null
        }
        Insert: {
          created_at?: string
          domain: string
          email: string
          full_name: string
          id?: string
          lpu_reg_no: string
          phone: string
          portfolio_url?: string | null
          programme?: string | null
          role?: string
          semester?: number | null
          why?: string | null
        }
        Update: {
          created_at?: string
          domain?: string
          email?: string
          full_name?: string
          id?: string
          lpu_reg_no?: string
          phone?: string
          portfolio_url?: string | null
          programme?: string | null
          role?: string
          semester?: number | null
          why?: string | null
        }
        Relationships: []
      }
      batches: {
        Row: {
          created_at: string
          domain: string
          id: string
          mentor_name: string | null
          name: string
          schedule: string | null
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          mentor_name?: string | null
          name: string
          schedule?: string | null
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          mentor_name?: string | null
          name?: string
          schedule?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          capacity: number | null
          category: string
          created_at: string
          description: string
          event_date: string
          id: string
          location: string | null
          qr_code: string | null
          title: string
        }
        Insert: {
          capacity?: number | null
          category: string
          created_at?: string
          description: string
          event_date: string
          id?: string
          location?: string | null
          qr_code?: string | null
          title: string
        }
        Update: {
          capacity?: number | null
          category?: string
          created_at?: string
          description?: string
          event_date?: string
          id?: string
          location?: string | null
          qr_code?: string | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          auth_user_id: string | null
          avatar_url: string | null
          badge_level: string
          batch_id: string | null
          email: string
          full_name: string
          id: string
          interest_tags: string[]
          joined_at: string
          lpu_reg_no: string
          phone: string | null
          points: number
          programme: string
          queue_position: number
          section: string | null
          semester: number
        }
        Insert: {
          auth_user_id?: string | null
          avatar_url?: string | null
          badge_level?: string
          batch_id?: string | null
          email: string
          full_name: string
          id?: string
          interest_tags?: string[]
          joined_at?: string
          lpu_reg_no: string
          phone?: string | null
          points?: number
          programme: string
          queue_position?: number
          section?: string | null
          semester: number
        }
        Update: {
          auth_user_id?: string | null
          avatar_url?: string | null
          badge_level?: string
          batch_id?: string | null
          email?: string
          full_name?: string
          id?: string
          interest_tags?: string[]
          joined_at?: string
          lpu_reg_no?: string
          phone?: string | null
          points?: number
          programme?: string
          queue_position?: number
          section?: string | null
          semester?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "team_lead" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "team_lead", "admin", "super_admin"],
    },
  },
} as const
