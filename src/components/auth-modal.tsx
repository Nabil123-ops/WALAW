"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "signup"
  onSwitchMode: (mode: "login" | "signup") => void
  isDark?: boolean
}

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode, isDark = false }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let result
      if (mode === "login") {
        result = await login(formData.email, formData.password)
      } else {
        result = await signup({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      }

      if (result.success) {
        onClose()
        setFormData({ email: "", password: "", firstName: "", lastName: "" })
      } else {
        setError(result.error || "An error occurred")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <Card className={`relative w-full max-w-md mx-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`absolute right-0 top-0 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className={isDark ? "text-white" : "text-gray-900"}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
            {mode === "login"
              ? "Sign in to your Tzeego account to access exclusive deals and cashback rewards"
              : "Join Tzeego to start earning cashback on your travel bookings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className={isDark ? "text-gray-300" : "text-gray-700"}>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className={isDark ? "text-gray-300" : "text-gray-700"}>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email" className={isDark ? "text-gray-300" : "text-gray-700"}>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>
            <div>
              <Label htmlFor="password" className={isDark ? "text-gray-300" : "text-gray-700"}>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-0 top-0 h-full px-3 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
                className={`p-0 ml-1 h-auto font-normal ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
