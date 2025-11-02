// Mock implementation - no Supabase required
export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  join_date: string
  total_bookings: number
  total_savings: number
  cashback_balance: number
  membership_level: "Bronze" | "Silver" | "Gold" | "Platinum"
  created_at?: string
  updated_at?: string
}

// Mock client for demo purposes - no actual Supabase connection
export const supabase = null
