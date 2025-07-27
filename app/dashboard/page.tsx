"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  User,
  Upload,
  MessageSquare,
  Code,
  BarChart3,
  Clock,
  Target,
  Search,
  Play,
  Award,
  Calendar,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useResume } from "@/contexts/ResumeContext"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const { resumeData } = useResume()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data for recommended tests
  const recommendedTests = [
    {
      id: 1,
      title: "Behavioral Mock Interview",
      description: "Practice STAR method with leadership scenarios",
      type: "interview",
      duration: "30 min",
      difficulty: "Medium",
      relevanceScore: 95,
      icon: MessageSquare,
      color: "blue",
      category: "Behavioral",
    },
    {
      id: 2,
      title: "React Component Challenge",
      description: "Build a dynamic component with hooks",
      type: "coding",
      duration: "45 min",
      difficulty: "Medium",
      relevanceScore: 92,
      icon: Code,
      color: "green",
      category: "Technical",
    },
    {
      id: 3,
      title: "System Design: Chat Application",
      description: "Design a scalable real-time messaging system",
      type: "system-design",
      duration: "60 min",
      difficulty: "Hard",
      relevanceScore: 88,
      icon: BarChart3,
      color: "purple",
      category: "System Design",
    },
    {
      id: 4,
      title: "JavaScript Fundamentals Quiz",
      description: "Test your knowledge of ES6+ features",
      type: "quiz",
      duration: "20 min",
      difficulty: "Easy",
      relevanceScore: 85,
      icon: Code,
      color: "orange",
      category: "Technical",
    },
  ]

  const allTests = [
    ...recommendedTests,
    {
      id: 5,
      title: "SQL Query Optimization",
      description: "Practice complex joins and performance tuning",
      type: "coding",
      duration: "40 min",
      difficulty: "Hard",
      relevanceScore: 75,
      icon: BarChart3,
      color: "blue",
      category: "Database",
    },
    {
      id: 6,
      title: "Product Manager Case Study",
      description: "Analyze market opportunity and create roadmap",
      type: "case-study",
      duration: "90 min",
      difficulty: "Hard",
      relevanceScore: 70,
      icon: Target,
      color: "purple",
      category: "Product",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      title: "Completed React Hooks Quiz",
      score: 85,
      date: "2 days ago",
      type: "quiz",
    },
    {
      id: 2,
      title: "Behavioral Interview Practice",
      score: 78,
      date: "1 week ago",
      type: "interview",
    },
    {
      id: 3,
      title: "Algorithm Challenge: Two Sum",
      score: 92,
      date: "1 week ago",
      type: "coding",
    },
  ]

  const achievements = [
    { title: "First Interview", description: "Completed your first mock interview", earned: true },
    { title: "Code Master", description: "Solved 10 coding challenges", earned: true },
    { title: "Consistent Learner", description: "Practiced 5 days in a row", earned: false },
    { title: "System Designer", description: "Completed 3 system design interviews", earned: false },
  ]

  const filteredTests = allTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || test.category.toLowerCase() === selectedFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const categories = ["all", "behavioral", "technical", "system design", "database", "product"]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName || "there"}! 👋</h1>
            <p className="opacity-90">Ready to ace your next interview? Let's continue your preparation journey.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">78%</div>
            <div className="text-sm opacity-90">Overall Progress</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resume Insights Panel */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <User className="w-5 h-5 mr-2" />
                Resume Insights
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                AI analysis of your background and skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resumeData?.parsedData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Skills Overview</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.parsedData.skills?.slice(0, 8).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {resumeData.parsedData.skills?.length > 8 && (
                        <Badge variant="outline">+{resumeData.parsedData.skills.length - 8} more</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 AI Recommendations</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Strong React skills - try advanced component challenges</li>
                      <li>• Consider practicing system design for senior roles</li>
                      <li>• Your AWS experience is valuable - showcase it in interviews</li>
                    </ul>
                  </div>

                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Re-upload Resume
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">No resume uploaded</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your resume to get personalized recommendations
                  </p>
                  <Button asChild>
                    <Link href="/onboarding">Upload Resume</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Tests */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <Target className="w-5 h-5 mr-2" />
                Recommended for You
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Personalized tests based on your resume and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendedTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          test.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : test.color === "green"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : test.color === "purple"
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : "bg-orange-100 dark:bg-orange-900/30"
                        }`}
                      >
                        <test.icon
                          className={`w-5 h-5 ${
                            test.color === "blue"
                              ? "text-blue-600 dark:text-blue-400"
                              : test.color === "green"
                                ? "text-green-600 dark:text-green-400"
                                : test.color === "purple"
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{test.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {test.duration}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {test.difficulty}
                          </Badge>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {test.relevanceScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/test/${test.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Catalog */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <BarChart3 className="w-5 h-5 mr-2" />
                Browse All Tests
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Explore our complete library of interview preparation materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search tests..."
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedFilter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(category)}
                      className="bg-transparent"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Test Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredTests.map((test) => (
                  <Card
                    key={test.id}
                    className="hover:shadow-md transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            test.color === "blue"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : test.color === "green"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : test.color === "purple"
                                  ? "bg-purple-100 dark:bg-purple-900/30"
                                  : "bg-orange-100 dark:bg-orange-900/30"
                          }`}
                        >
                          <test.icon
                            className={`w-4 h-4 ${
                              test.color === "blue"
                                ? "text-blue-600 dark:text-blue-400"
                                : test.color === "green"
                                  ? "text-green-600 dark:text-green-400"
                                  : test.color === "purple"
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-orange-600 dark:text-orange-400"
                            }`}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {test.category}
                        </Badge>
                      </div>

                      <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{test.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{test.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {test.duration}
                          </span>
                          <span>{test.difficulty}</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/test/${test.id}`}>Start</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                  <span className="text-gray-900 dark:text-gray-100">78%</span>
                </div>
                <Progress value={78} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tests Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">85%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{activity.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{activity.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/profile">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-gray-900 dark:text-gray-100">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 ${achievement.earned ? "opacity-100" : "opacity-50"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <Award
                        className={`w-4 h-4 ${achievement.earned ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400 dark:text-gray-500"}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{achievement.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/test/random">
                  <Play className="w-4 h-4 mr-2" />
                  Random Practice
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/schedule">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                <Link href="/profile">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
