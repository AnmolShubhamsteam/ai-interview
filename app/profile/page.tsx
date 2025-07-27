"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Edit3,
  Upload,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  MessageSquare,
  Code,
  BarChart3,
  Download,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const MOCK_ACTIVITY = [
  {
    id: 1,
    type: "interview",
    title: "Behavioral Interview: Leadership",
    score: 85,
    date: "2024-01-15",
    duration: "28 min",
    status: "completed",
  },
  {
    id: 2,
    type: "coding",
    title: "React Component Challenge",
    score: 92,
    date: "2024-01-14",
    duration: "42 min",
    status: "completed",
  },
  {
    id: 3,
    type: "system-design",
    title: "System Design: Chat Application",
    score: 78,
    date: "2024-01-12",
    duration: "58 min",
    status: "completed",
  },
  {
    id: 4,
    type: "quiz",
    title: "JavaScript Fundamentals",
    score: 88,
    date: "2024-01-10",
    duration: "15 min",
    status: "completed",
  },
  {
    id: 5,
    type: "interview",
    title: "Conflict Resolution Practice",
    score: 76,
    date: "2024-01-08",
    duration: "22 min",
    status: "completed",
  },
]

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first mock interview",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-05",
  },
  {
    id: 2,
    title: "Code Master",
    description: "Solved 10 coding challenges",
    icon: "💻",
    earned: true,
    earnedDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Consistent Learner",
    description: "Practiced 7 days in a row",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-14",
  },
  {
    id: 4,
    title: "High Achiever",
    description: "Scored 90%+ on 5 tests",
    icon: "⭐",
    earned: false,
    progress: 60,
  },
  {
    id: 5,
    title: "System Designer",
    description: "Completed 3 system design interviews",
    icon: "🏗️",
    earned: false,
    progress: 33,
  },
  {
    id: 6,
    title: "Interview Pro",
    description: "Completed 20 mock interviews",
    icon: "🎤",
    earned: false,
    progress: 25,
  },
]

const SKILLS_PROGRESS = [
  { skill: "React", level: 85, category: "Frontend" },
  { skill: "JavaScript", level: 90, category: "Frontend" },
  { skill: "Node.js", level: 75, category: "Backend" },
  { skill: "System Design", level: 60, category: "Architecture" },
  { skill: "Communication", level: 80, category: "Soft Skills" },
  { skill: "Leadership", level: 70, category: "Soft Skills" },
  { skill: "Problem Solving", level: 88, category: "Technical" },
  { skill: "Python", level: 65, category: "Backend" },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Love building scalable applications and mentoring junior developers.",
    linkedIn: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.dev",
  })

  const stats = {
    testsCompleted: MOCK_ACTIVITY.length,
    averageScore: Math.round(MOCK_ACTIVITY.reduce((sum, activity) => sum + activity.score, 0) / MOCK_ACTIVITY.length),
    totalTime: MOCK_ACTIVITY.reduce((sum, activity) => {
      const minutes = Number.parseInt(activity.duration.split(" ")[0])
      return sum + minutes
    }, 0),
    achievementsEarned: ACHIEVEMENTS.filter((a) => a.earned).length,
    currentStreak: 7,
    joinDate: "2023-12-01",
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data logic would go here
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "interview":
        return MessageSquare
      case "coding":
        return Code
      case "system-design":
        return BarChart3
      case "quiz":
        return Target
      default:
        return Target
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and track your progress</p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96&query=user+avatar"} />
                  <AvatarFallback className="text-2xl">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Upload className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">{profileData.title}</p>
                <p className="text-sm text-gray-500">
                  {profileData.company} • {profileData.location}
                </p>
              </div>
            </CardHeader>

            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSave} className="flex-1">
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{profileData.bio}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-20">Email:</span>
                      <span className="text-gray-600">{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-20">LinkedIn:</span>
                      <span className="text-blue-600">{profileData.linkedIn}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-20">GitHub:</span>
                      <span className="text-blue-600">{profileData.github}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-20">Website:</span>
                      <span className="text-blue-600">{profileData.website}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.testsCompleted}</div>
                  <div className="text-xs text-gray-600">Tests Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                  <div className="text-xs text-gray-600">Average Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{Math.floor(stats.totalTime / 60)}h</div>
                  <div className="text-xs text-gray-600">Practice Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>

              <div className="text-center pt-2 border-t">
                <div className="text-sm text-gray-600">
                  Member since {new Date(stats.joinDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest test results and practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_ACTIVITY.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type)
                      return (
                        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(activity.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {activity.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                              {activity.score}%
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    {stats.achievementsEarned} of {ACHIEVEMENTS.length} achievements unlocked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {ACHIEVEMENTS.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 border rounded-lg ${
                          achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`text-2xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${achievement.earned ? "text-yellow-800" : "text-gray-600"}`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-sm ${achievement.earned ? "text-yellow-700" : "text-gray-500"}`}>
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <div className="text-xs text-yellow-600 mt-1">
                                Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                              </div>
                            ) : achievement.progress ? (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-1" />
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 mt-1">Not started</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Skills Progress
                  </CardTitle>
                  <CardDescription>Track your improvement across different skill areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {SKILLS_PROGRESS.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.skill}</span>
                            <Badge variant="outline" className="text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <span className="text-sm font-bold">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>This Week</span>
                        <span className="font-bold text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-bold text-blue-600">+8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Overall</span>
                        <span className="font-bold text-purple-600">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Focus Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Design</span>
                        <Badge variant="outline" className="text-xs">
                          Needs Work
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Communication</span>
                        <Badge variant="secondary" className="text-xs">
                          Good
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Coding</span>
                        <Badge className="text-xs">Excellent</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Study Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Focus on System Design</h4>
                      <p className="text-sm text-blue-700">
                        Your system design scores are below average. Consider taking more practice sessions.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">Keep up the coding practice</h4>
                      <p className="text-sm text-green-700">
                        Your coding skills are strong. Continue with advanced challenges.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
