"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ResumeData {
  resumeFile?: File
  parsedData?: {
    personalInfo: {
      name: string
      email: string
      phone: string
      location: string
    }
    experience: Array<{
      title: string
      company: string
      duration: string
      description: string
    }>
    education: Array<{
      degree: string
      school: string
      year: string
    }>
    skills: string[]
    summary: string
  }
  targetRole?: {
    id: string
    title: string
    category: string
  }
  careerLevel?: {
    id: string
    title: string
  }
  goals?: Array<{
    id: string
    title: string
    category: string
  }>
}

interface ResumeContextType {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  updateResumeData: (updates: Partial<ResumeData>) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>({})

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateResumeData }}>{children}</ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
