"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Briefcase,
  GraduationCap,
  Code,
  ArrowRight,
} from "lucide-react"

interface ResumeUploaderProps {
  onComplete: (data: any) => void
}

export function ResumeUploader({ onComplete }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parsedData, setParsedData] = useState<any>(null)
  const [error, setError] = useState("")

  const handleFileSelect = useCallback((selectedFile: File) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 5MB")
      return
    }

    setFile(selectedFile)
    setError("")
    handleUpload(selectedFile)
  }, [])

  const handleUpload = async (fileToUpload: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call for resume parsing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Mock parsed resume data
      const mockParsedData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
        },
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            duration: "2021 - Present",
            description: "Led development of React applications and microservices",
          },
          {
            title: "Software Engineer",
            company: "StartupXYZ",
            duration: "2019 - 2021",
            description: "Built full-stack web applications using Node.js and React",
          },
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            school: "University of California",
            year: "2019",
          },
        ],
        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "Python",
          "AWS",
          "Docker",
          "MongoDB",
          "PostgreSQL",
          "Git",
          "Agile",
          "System Design",
        ],
        summary:
          "Experienced software engineer with 4+ years in full-stack development, specializing in React and Node.js applications.",
      }

      setParsedData(mockParsedData)
    } catch (err) {
      setError("Failed to parse resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        handleFileSelect(droppedFile)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleContinue = () => {
    onComplete({
      resumeFile: file,
      parsedData: parsedData,
    })
  }

  if (parsedData) {
    return (
      <div className="space-y-6">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Resume successfully parsed! Review the extracted information below.</AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {/* Personal Info */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Personal Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <strong>Name:</strong> {parsedData.personalInfo.name}
                </div>
                <div>
                  <strong>Email:</strong> {parsedData.personalInfo.email}
                </div>
                <div>
                  <strong>Phone:</strong> {parsedData.personalInfo.phone}
                </div>
                <div>
                  <strong>Location:</strong> {parsedData.personalInfo.location}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Experience</h3>
              </div>
              <div className="space-y-3">
                {parsedData.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-3">
                    <div className="font-medium">{exp.title}</div>
                    <div className="text-sm text-gray-600">
                      {exp.company} • {exp.duration}
                    </div>
                    <div className="text-sm mt-1">{exp.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <Code className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {parsedData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center mb-3">
                <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Education</h3>
              </div>
              {parsedData.education.map((edu: any, index: number) => (
                <div key={index}>
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm text-gray-600">
                    {edu.school} • {edu.year}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Button onClick={handleContinue} className="w-full">
          Continue to Job Role Selection
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!file && (
        <Card
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-gray-600 mb-4">Drag and drop your resume here, or click to browse</p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0]
                  if (selectedFile) handleFileSelect(selectedFile)
                }}
                className="hidden"
                id="resume-upload"
              />
              <Button asChild>
                <label htmlFor="resume-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              <p className="text-sm text-gray-500 mt-2">Supports PDF and DOCX files up to 5MB</p>
            </div>
          </CardContent>
        </Card>
      )}

      {file && isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div className="flex-1">
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Parsing resume...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Our AI is analyzing your resume to extract skills, experience, and education.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
