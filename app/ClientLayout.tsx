"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ResumeProvider } from "@/contexts/ResumeContext"
import { AppLayout } from "@/components/layout/AppLayout"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

const publicRoutes = ["/", "/auth/login", "/auth/signup"]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicRoute = publicRoutes.includes(pathname)

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white dark:bg-gray-900 transition-colors`}>
        <AuthProvider>
          <ResumeProvider>{isPublicRoute ? children : <AppLayout>{children}</AppLayout>}</ResumeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
