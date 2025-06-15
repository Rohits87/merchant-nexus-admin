export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      acquirers: {
        Row: {
          acquirer_code: string
          bank_name: string
          bin_ranges: string[] | null
          country: string | null
          created_at: string
          currency: string | null
          id: string
          status: Database["public"]["Enums"]["acquirer_status"]
          support_email: string | null
          support_phone: string | null
          updated_at: string
        }
        Insert: {
          acquirer_code: string
          bank_name: string
          bin_ranges?: string[] | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: Database["public"]["Enums"]["acquirer_status"]
          support_email?: string | null
          support_phone?: string | null
          updated_at?: string
        }
        Update: {
          acquirer_code?: string
          bank_name?: string
          bin_ranges?: string[] | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: Database["public"]["Enums"]["acquirer_status"]
          support_email?: string | null
          support_phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gateways: {
        Row: {
          auth_endpoint: string | null
          capture_endpoint: string | null
          code: string
          created_at: string
          id: string
          name: string
          refund_endpoint: string | null
          sla_timeout: number | null
          status: Database["public"]["Enums"]["gateway_status"]
          supported_methods:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          updated_at: string
        }
        Insert: {
          auth_endpoint?: string | null
          capture_endpoint?: string | null
          code: string
          created_at?: string
          id?: string
          name: string
          refund_endpoint?: string | null
          sla_timeout?: number | null
          status?: Database["public"]["Enums"]["gateway_status"]
          supported_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          updated_at?: string
        }
        Update: {
          auth_endpoint?: string | null
          capture_endpoint?: string | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          refund_endpoint?: string | null
          sla_timeout?: number | null
          status?: Database["public"]["Enums"]["gateway_status"]
          supported_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          updated_at?: string
        }
        Relationships: []
      }
      merchants: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          address_line3: string | null
          business_type: string | null
          callback_url: string | null
          city: string | null
          contact_name: string | null
          country: string | null
          created_at: string
          data_encryption_key: string | null
          description: string | null
          email_address: string | null
          fax_number: string | null
          id: string
          language: string | null
          merchant_code: string
          merchant_id: string
          merchant_name: string
          mobile_number: string | null
          payment_methods:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          return_url: string | null
          state: string | null
          status: Database["public"]["Enums"]["merchant_status"]
          technical_contact_name: string | null
          technical_email_address: string | null
          technical_phone_number: string | null
          theme: string | null
          updated_at: string
          web_address: string | null
          zip_code: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          address_line3?: string | null
          business_type?: string | null
          callback_url?: string | null
          city?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          data_encryption_key?: string | null
          description?: string | null
          email_address?: string | null
          fax_number?: string | null
          id?: string
          language?: string | null
          merchant_code: string
          merchant_id: string
          merchant_name: string
          mobile_number?: string | null
          payment_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          return_url?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["merchant_status"]
          technical_contact_name?: string | null
          technical_email_address?: string | null
          technical_phone_number?: string | null
          theme?: string | null
          updated_at?: string
          web_address?: string | null
          zip_code?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          address_line3?: string | null
          business_type?: string | null
          callback_url?: string | null
          city?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          data_encryption_key?: string | null
          description?: string | null
          email_address?: string | null
          fax_number?: string | null
          id?: string
          language?: string | null
          merchant_code?: string
          merchant_id?: string
          merchant_name?: string
          mobile_number?: string | null
          payment_methods?:
            | Database["public"]["Enums"]["payment_method"][]
            | null
          return_url?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["merchant_status"]
          technical_contact_name?: string | null
          technical_email_address?: string | null
          technical_phone_number?: string | null
          theme?: string | null
          updated_at?: string
          web_address?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          acquirer_id: string | null
          amount: number
          created_at: string
          currency: string
          customer_email: string | null
          customer_phone: string | null
          gateway_id: string | null
          id: string
          merchant_id: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: string
          transaction_id: string
          updated_at: string
        }
        Insert: {
          acquirer_id?: string | null
          amount: number
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_phone?: string | null
          gateway_id?: string | null
          id?: string
          merchant_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: string
          transaction_id: string
          updated_at?: string
        }
        Update: {
          acquirer_id?: string | null
          amount?: number
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_phone?: string | null
          gateway_id?: string | null
          id?: string
          merchant_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: string
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_acquirer_id_fkey"
            columns: ["acquirer_id"]
            isOneToOne: false
            referencedRelation: "acquirers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_gateway_id_fkey"
            columns: ["gateway_id"]
            isOneToOne: false
            referencedRelation: "gateways"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      acquirer_status: "active" | "inactive" | "maintenance"
      gateway_status: "active" | "inactive" | "maintenance"
      merchant_status: "active" | "inactive" | "pending" | "suspended"
      payment_method:
        | "credit_card"
        | "debit_card"
        | "upi"
        | "wallet"
        | "net_banking"
        | "bnpl"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      acquirer_status: ["active", "inactive", "maintenance"],
      gateway_status: ["active", "inactive", "maintenance"],
      merchant_status: ["active", "inactive", "pending", "suspended"],
      payment_method: [
        "credit_card",
        "debit_card",
        "upi",
        "wallet",
        "net_banking",
        "bnpl",
      ],
    },
  },
} as const
