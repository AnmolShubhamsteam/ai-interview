"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Code, BarChart3, Users, Clock, Target, ArrowRight, CheckCircle } from "lucide-react"

interface GoalsSelectorProps {
  onComplete: (data: any) => void
}

const GOALS = [
  {
    id: "behavioral",
    title: "Improve Behavioral Interviews",
    icon: MessageSquare,
    description: "Practice STAR method, leadership scenarios, and soft skills",
    category: "Communication",
    popular: true,
  },
  {
    id: "coding",
    title: "Master Coding Challenges",
    icon: Code,
    description: "Algorithm problems, data structures, and live coding",
    category: "Technical",
    popular: true,
  },
  {
    id: "system-design",
    title: "System Design Preparation",
    icon: BarChart3,
    description: "Architecture, scalability, and design patterns",
    category: "Technical",
    popular: true,
  },
  {
    id: "communication",
    title: "Enhance Communication Skills",
    icon: Users,
    description: "Articulate ideas clearly and confidently",
    category: "Communication",
    popular: false,
  },
  {
    id: "time-management",
    title: "Interview Time Management",
    icon: Clock,
    description: "Practice answering within time limits",
    category: "Strategy",
    popular: false,
  },
  {
    id: "confidence",
    title: "Build Interview Confidence",
    icon: Target,
    description: "Reduce anxiety and improve self-presentation",
    category: "Personal",
    popular: true,
  },
]

export function GoalsSelector({ onComplete }: GoalsSelectorProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  const handleContinue = () => {
    const goals = GOALS.filter((g) => selectedGoals.includes(g.id))
    onComplete({
      goals: goals,
    })
  }

  const categories = Array.from(new Set(GOALS.map((goal) => goal.category)))

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">Select what you'd like to focus on. You can always change these later.</p>
        <Badge variant="secondary" className="mt-2">
          Choose 2-4 goals for best results
        </Badge>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h3 className="font-semibold mb-3 text-gray-700">{category}</h3>
          <div className="grid gap-3">
            {GOALS.filter((goal) => goal.category === category).map((goal) => (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedGoals.includes(goal.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleGoalToggle(goal.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center pt-1">
                      <Checkbox checked={selectedGoals.includes(goal.id)} onChange={() => handleGoalToggle(goal.id)} />
                    </div>

                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <goal.icon className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        {goal.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {selectedGoals.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Great! We'll personalize your experience based on these goals.
            </p>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleContinue} className="w-full" disabled={selectedGoals.length === 0}>
        Complete Setup
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
