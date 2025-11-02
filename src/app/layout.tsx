import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import GlobalInterceptor from "@/components/global-interceptor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tzeego - Find Cheap Flights & Save Big",
  description: "Compare prices from hundreds of airlines and travel sites to get the best deals",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <GlobalInterceptor />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
