"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ResumeUploader } from "@/components/resume/ResumeUploader"
import { JobRoleSelector } from "@/components/onboarding/JobRoleSelector"
import { CareerLevelSelector } from "@/components/onboarding/CareerLevelSelector"
import { GoalsSelector } from "@/components/onboarding/GoalsSelector"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useResume } from "@/contexts/ResumeContext"

const STEPS = [
  { id: 1, title: "Upload Resume", description: "Let AI analyze your background" },
  { id: 2, title: "Select Job Role", description: "Choose your target position" },
  { id: 3, title: "Career Level", description: "Set your experience level" },
  { id: 4, title: "Set Goals", description: "Define what you want to improve" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const router = useRouter()
  const { resumeData, setResumeData } = useResume()

  const handleStepComplete = (stepId: number, data?: any) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }

    if (data) {
      setResumeData({ ...resumeData, ...data })
    }

    if (stepId < STEPS.length) {
      setCurrentStep(stepId + 1)
    } else {
      // Onboarding complete
      router.push("/dashboard")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (completedSteps.length / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to CareerAI</h1>
          <p className="text-gray-600">Let's personalize your interview preparation experience</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-gray-600">
              {completedSteps.length} of {STEPS.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${
                    completedSteps.includes(step.id)
                      ? "bg-green-500 border-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                  }
                `}
                >
                  {completedSteps.includes(step.id) ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Badge variant="secondary" className="w-fit mx-auto mb-2">
              Step {currentStep} of {STEPS.length}
            </Badge>
            <CardTitle className="text-2xl">{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>

          <CardContent>
            {currentStep === 1 && <ResumeUploader onComplete={(data) => handleStepComplete(1, data)} />}

            {currentStep === 2 && <JobRoleSelector onComplete={(data) => handleStepComplete(2, data)} />}

            {currentStep === 3 && <CareerLevelSelector onComplete={(data) => handleStepComplete(3, data)} />}

            {currentStep === 4 && <GoalsSelector onComplete={(data) => handleStepComplete(4, data)} />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </div>
    </div>
  )
}
