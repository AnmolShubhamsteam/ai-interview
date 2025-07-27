"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Target,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  Code,
  BarChart3,
  Users,
} from "lucide-react"

const GOAL_CATEGORIES = [
  {
    id: "technical",
    name: "Technical Skills",
    icon: Code,
    color: "blue",
    description: "Improve coding and technical abilities",
  },
  {
    id: "behavioral",
    name: "Behavioral Interviews",
    icon: MessageSquare,
    color: "green",
    description: "Master soft skills and communication",
  },
  {
    id: "system-design",
    name: "System Design",
    icon: BarChart3,
    color: "purple",
    description: "Learn to design scalable systems",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    color: "orange",
    description: "Develop management and team skills",
  },
]

const MOCK_GOALS = [
  {
    id: 1,
    title: "Master React Hooks and Context",
    category: "technical",
    description: "Complete advanced React challenges and build complex applications",
    targetDate: "2024-02-15",
    progress: 75,
    status: "in-progress",
    milestones: [
      { id: 1, title: "Complete useState and useEffect challenges", completed: true },
      { id: 2, title: "Build a Context-based state management app", completed: true },
      { id: 3, title: "Master custom hooks", completed: true },
      { id: 4, title: "Complete advanced patterns quiz", completed: false },
    ],
    relatedTests: ["React Component Challenge", "State Management Quiz", "Custom Hooks Practice"],
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    title: "Improve STAR Method Responses",
    category: "behavioral",
    description: "Practice structured behavioral interview responses using STAR method",
    targetDate: "2024-02-01",
    progress: 90,
    status: "in-progress",
    milestones: [
      { id: 1, title: "Learn STAR method framework", completed: true },
      { id: 2, title: "Practice 10 leadership scenarios", completed: true },
      { id: 3, title: "Record and review responses", completed: true },
      { id: 4, title: "Complete mock behavioral interview", completed: false },
    ],
    relatedTests: ["Behavioral Interview: Leadership", "STAR Method Practice", "Communication Skills"],
    createdDate: "2024-01-05",
  },
  {
    id: 3,
    title: "System Design Fundamentals",
    category: "system-design",
    description: "Learn to design scalable distributed systems",
    targetDate: "2024-03-01",
    progress: 45,
    status: "in-progress",
    milestones: [
      { id: 1, title: "Study load balancing concepts", completed: true },
      { id: 2, title: "Learn database scaling strategies", completed: true },
      { id: 3, title: "Practice API design", completed: false },
      { id: 4, title: "Complete system design interview", completed: false },
    ],
    relatedTests: ["System Design: URL Shortener", "Database Design Quiz", "API Design Challenge"],
    createdDate: "2024-01-10",
  },
  {
    id: 4,
    title: "Build Confidence in Technical Interviews",
    category: "technical",
    description: "Reduce anxiety and improve performance in coding interviews",
    targetDate: "2024-01-30",
    progress: 100,
    status: "completed",
    milestones: [
      { id: 1, title: "Complete 20 coding challenges", completed: true },
      { id: 2, title: "Practice live coding sessions", completed: true },
      { id: 3, title: "Mock technical interview", completed: true },
      { id: 4, title: "Achieve 90%+ success rate", completed: true },
    ],
    relatedTests: ["Algorithm Challenges", "Live Coding Practice", "Technical Interview Simulation"],
    createdDate: "2023-12-15",
    completedDate: "2024-01-28",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(MOCK_GOALS)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCompleted, setShowCompleted] = useState(true)

  const filteredGoals = goals.filter((goal) => {
    const matchesCategory = selectedCategory === "all" || goal.category === selectedCategory
    const matchesStatus = showCompleted || goal.status !== "completed"
    return matchesCategory && matchesStatus
  })

  const stats = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "completed").length,
    inProgress: goals.filter((g) => g.status === "in-progress").length,
    avgProgress: Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length),
  }

  const getCategoryInfo = (categoryId: string) => {
    return GOAL_CATEGORIES.find((cat) => cat.id === categoryId) || GOAL_CATEGORIES[0]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "paused":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const toggleMilestone = (goalId: number, milestoneId: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone,
          )
          const completedCount = updatedMilestones.filter((m) => m.completed).length
          const newProgress = Math.round((completedCount / updatedMilestones.length) * 100)

          return {
            ...goal,
            milestones: updatedMilestones,
            progress: newProgress,
            status: newProgress === 100 ? "completed" : "in-progress",
          }
        }
        return goal
      }),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Career Goals</h1>
          <p className="text-gray-600 mt-1">Track your progress and achieve your career objectives</p>
        </div>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Goals</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.avgProgress}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Category:</span>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All
                </Button>
                {GOAL_CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4 mr-1" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="show-completed" checked={showCompleted} onCheckedChange={setShowCompleted} />
              <label htmlFor="show-completed" className="text-sm">
                Show completed goals
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => {
          const categoryInfo = getCategoryInfo(goal.category)
          const daysUntilTarget = Math.ceil(
            (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
          )

          return (
            <Card key={goal.id} className={`${goal.status === "completed" ? "bg-green-50 border-green-200" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${categoryInfo.color}-100`}
                    >
                      <categoryInfo.icon className={`w-5 h-5 text-${categoryInfo.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {goal.title}
                        {goal.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </CardTitle>
                      <CardDescription className="mt-1">{goal.description}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline">{categoryInfo.name}</Badge>
                        <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status === "completed" ? "Completed" : "In Progress"}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {goal.status === "completed"
                            ? `Completed ${new Date(goal.completedDate!).toLocaleDateString()}`
                            : daysUntilTarget > 0
                              ? `${daysUntilTarget} days left`
                              : "Overdue"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-bold">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="font-medium mb-3">Milestones</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center space-x-3">
                        <Checkbox
                          checked={milestone.completed}
                          onCheckedChange={() => toggleMilestone(goal.id, milestone.id)}
                        />
                        <span className={`text-sm ${milestone.completed ? "line-through text-gray-500" : ""}`}>
                          {milestone.title}
                        </span>
                        {milestone.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Tests */}
                <div>
                  <h4 className="font-medium mb-2">Related Practice</h4>
                  <div className="flex flex-wrap gap-2">
                    {goal.relatedTests.map((test, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-xs text-gray-500">Created {new Date(goal.createdDate).toLocaleDateString()}</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      View Progress
                    </Button>
                    <Button size="sm">
                      <Target className="w-4 h-4 mr-1" />
                      Practice Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No goals found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === "all"
                ? "Create your first career goal to start tracking progress"
                : "No goals found for the selected category"}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
