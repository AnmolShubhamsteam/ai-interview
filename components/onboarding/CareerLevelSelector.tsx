"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Award, ArrowRight } from "lucide-react"

interface CareerLevelSelectorProps {
  onComplete: (data: any) => void
}

const CAREER_LEVELS = [
  {
    id: "entry",
    title: "Entry Level",
    icon: Zap,
    description: "0-2 years of experience",
    details: [
      "New graduate or career changer",
      "Learning fundamental concepts",
      "Building first professional projects",
      "Focus on technical skills",
    ],
    color: "green",
  },
  {
    id: "mid",
    title: "Mid Level",
    icon: TrendingUp,
    description: "2-5 years of experience",
    details: [
      "Solid foundation in your field",
      "Can work independently",
      "Leading small projects",
      "Mentoring junior colleagues",
    ],
    color: "blue",
  },
  {
    id: "senior",
    title: "Senior Level",
    icon: Award,
    description: "5+ years of experience",
    details: [
      "Expert in your domain",
      "Leading complex projects",
      "Making architectural decisions",
      "Mentoring and hiring others",
    ],
    color: "purple",
  },
]

export function CareerLevelSelector({ onComplete }: CareerLevelSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("")

  const handleContinue = () => {
    const level = CAREER_LEVELS.find((l) => l.id === selectedLevel)
    onComplete({
      careerLevel: level,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          This helps us tailor interview questions and assessments to your experience level
        </p>
      </div>

      <div className="space-y-4">
        {CAREER_LEVELS.map((level) => (
          <Card
            key={level.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedLevel === level.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    level.color === "green" ? "bg-green-100" : level.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                  }`}
                >
                  <level.icon
                    className={`w-6 h-6 ${
                      level.color === "green"
                        ? "text-green-600"
                        : level.color === "blue"
                          ? "text-blue-600"
                          : "text-purple-600"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{level.title}</h3>
                    <Badge variant="outline">{level.description}</Badge>
                  </div>

                  <ul className="space-y-1">
                    {level.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleContinue} className="w-full" disabled={!selectedLevel}>
        Continue to Goals
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
