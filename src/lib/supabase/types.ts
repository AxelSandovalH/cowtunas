export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type UserRole = "admin" | "bobby";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          full_name: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      clients: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          country: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["clients"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          client_id: string;
          trip_date: string;
          anglers: number;
          status: BookingStatus;
          total_price: number;
          deposit_paid: number;
          expenses: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      maintenance: {
        Row: {
          id: string;
          service_date: string;
          description: string;
          cost: number;
          next_service_date: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["maintenance"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["maintenance"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          name: string;
          channel: "whatsapp" | "email" | "both";
          message: string;
          sent_at: string | null;
          recipients_count: number;
          created_at: string;
          created_by: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      booking_status: BookingStatus;
      user_role: UserRole;
    };
  };
}
