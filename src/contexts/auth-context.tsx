"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  user: UserProfile | null
  session: any | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateUser: (userData: Partial<UserProfile>) => Promise<void>
}

interface UserProfile {
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

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Initialize auth from localStorage
    const initializeAuth = async () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") {
          if (mounted) setIsLoading(false)
          return
        }

        // Check localStorage for existing session
        const savedUser = localStorage.getItem("tzeego_user")
        const savedSession = localStorage.getItem("tzeego_session")

        if (savedUser && savedSession) {
          const userData = JSON.parse(savedUser)
          const sessionData = JSON.parse(savedSession)

          // Check if session is still valid (24 hours)
          if (sessionData.expires_at > Date.now()) {
            if (mounted) {
              setUser(userData)
              setSession(sessionData)
              setIsAuthenticated(true)
            }
          } else {
            // Session expired, clear it
            localStorage.removeItem("tzeego_user")
            localStorage.removeItem("tzeego_session")
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
        // Clear corrupted data
        if (typeof window !== "undefined") {
          localStorage.removeItem("tzeego_user")
          localStorage.removeItem("tzeego_session")
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    return () => {
      mounted = false
    }
  }, [])

  const createUserProfile = (email: string, firstName: string, lastName: string): UserProfile => {
    return {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      first_name: firstName,
      last_name: lastName,
      join_date: new Date().toISOString().split("T")[0],
      total_bookings: Math.floor(Math.random() * 5), // Random demo data
      total_savings: Math.floor(Math.random() * 1000), // Random demo data
      cashback_balance: Math.floor(Math.random() * 100), // Random demo data
      membership_level: "Bronze",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      if (!email || !password) {
        return { success: false, error: "Email and password are required" }
      }

      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" }
      }

      // Check if we're in the browser
      if (typeof window === "undefined") {
        return { success: false, error: "Authentication not available" }
      }

      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem("tzeego_users") || "[]")
      const existingUser = existingUsers.find((u: any) => u.email === email)

      if (!existingUser) {
        return { success: false, error: "User not found. Please sign up first." }
      }

      if (existingUser.password !== password) {
        return { success: false, error: "Invalid password" }
      }

      // Remove password from user object for security
      const { password: _, ...userWithoutPassword } = existingUser

      // Create session
      const sessionData = {
        user: userWithoutPassword,
        access_token: `token_${Date.now()}`,
        expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }

      // Save to localStorage
      localStorage.setItem("tzeego_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("tzeego_session", JSON.stringify(sessionData))

      setUser(userWithoutPassword)
      setSession(sessionData)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate input
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        return { success: false, error: "All fields are required" }
      }

      if (userData.password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        return { success: false, error: "Please enter a valid email address" }
      }

      // Check if we're in the browser
      if (typeof window === "undefined") {
        return { success: false, error: "Authentication not available" }
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("tzeego_users") || "[]")
      const userExists = existingUsers.some((u: any) => u.email === userData.email)

      if (userExists) {
        return { success: false, error: "User with this email already exists" }
      }

      // Create user profile
      const newUser = createUserProfile(userData.email, userData.firstName, userData.lastName)
      const userWithPassword = { ...newUser, password: userData.password }

      // Save user to localStorage
      existingUsers.push(userWithPassword)
      localStorage.setItem("tzeego_users", JSON.stringify(existingUsers))

      // Create session
      const sessionData = {
        user: newUser,
        access_token: `token_${Date.now()}`,
        expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }

      // Save session
      localStorage.setItem("tzeego_user", JSON.stringify(newUser))
      localStorage.setItem("tzeego_session", JSON.stringify(sessionData))

      setUser(newUser)
      setSession(sessionData)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    try {
      // Check if we're in the browser
      if (typeof window !== "undefined") {
        // Clear localStorage
        localStorage.removeItem("tzeego_user")
        localStorage.removeItem("tzeego_session")
      }

      setUser(null)
      setSession(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const updateUser = async (userData: Partial<UserProfile>) => {
    if (!user || typeof window === "undefined") return

    try {
      const updatedUser = { ...user, ...userData, updated_at: new Date().toISOString() }

      // Update in localStorage
      localStorage.setItem("tzeego_user", JSON.stringify(updatedUser))

      // Update users array
      const existingUsers = JSON.parse(localStorage.getItem("tzeego_users") || "[]")
      const userIndex = existingUsers.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...userData }
        localStorage.setItem("tzeego_users", JSON.stringify(existingUsers))
      }

      setUser(updatedUser)
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
