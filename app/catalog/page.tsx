"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Clock,
  Star,
  Play,
  Users,
  TrendingUp,
  MessageSquare,
  Code,
  BarChart3,
  Database,
  Palette,
  Target,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

const ALL_TESTS = [
  {
    id: 1,
    title: "React Component Architecture",
    description: "Build scalable React components with proper state management and lifecycle methods",
    type: "coding",
    category: "Frontend",
    difficulty: "Medium",
    duration: "45 min",
    rating: 4.8,
    completions: 1234,
    tags: ["React", "JavaScript", "Components"],
    icon: Code,
    color: "blue",
    featured: true,
  },
  {
    id: 2,
    title: "Behavioral Interview: Leadership",
    description: "Practice leadership scenarios using the STAR method with AI feedback",
    type: "interview",
    category: "Behavioral",
    difficulty: "Medium",
    duration: "30 min",
    rating: 4.9,
    completions: 2156,
    tags: ["Leadership", "STAR Method", "Communication"],
    icon: MessageSquare,
    color: "green",
    featured: true,
  },
  {
    id: 3,
    title: "System Design: URL Shortener",
    description: "Design a scalable URL shortening service like bit.ly with caching and analytics",
    type: "system-design",
    category: "System Design",
    difficulty: "Hard",
    duration: "60 min",
    rating: 4.7,
    completions: 892,
    tags: ["System Design", "Scalability", "Caching"],
    icon: BarChart3,
    color: "purple",
    featured: true,
  },
  {
    id: 4,
    title: "SQL Query Optimization",
    description: "Master complex joins, subqueries, and performance optimization techniques",
    type: "coding",
    category: "Database",
    difficulty: "Hard",
    duration: "40 min",
    rating: 4.6,
    completions: 756,
    tags: ["SQL", "Database", "Performance"],
    icon: Database,
    color: "orange",
    featured: false,
  },
  {
    id: 5,
    title: "Product Manager Case Study",
    description: "Analyze market opportunity and create a product roadmap for a new feature",
    type: "case-study",
    category: "Product",
    difficulty: "Medium",
    duration: "90 min",
    rating: 4.5,
    completions: 543,
    tags: ["Product Strategy", "Market Analysis", "Roadmap"],
    icon: Target,
    color: "pink",
    featured: false,
  },
  {
    id: 6,
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of ES6+, async/await, closures, and modern JavaScript",
    type: "quiz",
    category: "Frontend",
    difficulty: "Easy",
    duration: "20 min",
    rating: 4.4,
    completions: 3421,
    tags: ["JavaScript", "ES6", "Fundamentals"],
    icon: Code,
    color: "yellow",
    featured: false,
  },
  {
    id: 7,
    title: "UX Design Portfolio Review",
    description: "Present and defend your design decisions in a mock portfolio review",
    type: "interview",
    category: "Design",
    difficulty: "Medium",
    duration: "45 min",
    rating: 4.7,
    completions: 432,
    tags: ["UX Design", "Portfolio", "Design Thinking"],
    icon: Palette,
    color: "indigo",
    featured: false,
  },
  {
    id: 8,
    title: "Data Science: ML Model Evaluation",
    description: "Build and evaluate machine learning models with proper validation techniques",
    type: "coding",
    category: "Data Science",
    difficulty: "Hard",
    duration: "75 min",
    rating: 4.8,
    completions: 234,
    tags: ["Machine Learning", "Python", "Model Evaluation"],
    icon: BarChart3,
    color: "teal",
    featured: false,
  },
  {
    id: 9,
    title: "DevOps: CI/CD Pipeline Setup",
    description: "Configure automated deployment pipelines with Docker and Kubernetes",
    type: "practical",
    category: "DevOps",
    difficulty: "Hard",
    duration: "90 min",
    rating: 4.6,
    completions: 187,
    tags: ["DevOps", "Docker", "Kubernetes", "CI/CD"],
    icon: Briefcase,
    color: "gray",
    featured: false,
  },
  {
    id: 10,
    title: "Conflict Resolution Scenarios",
    description: "Navigate workplace conflicts and difficult conversations with confidence",
    type: "interview",
    category: "Behavioral",
    difficulty: "Medium",
    duration: "35 min",
    rating: 4.5,
    completions: 1876,
    tags: ["Conflict Resolution", "Communication", "Teamwork"],
    icon: MessageSquare,
    color: "red",
    featured: false,
  },
]

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Data Science",
  "DevOps",
  "Product",
  "Design",
  "Behavioral",
  "System Design",
  "Database",
]
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"]
const TYPES = ["All", "coding", "interview", "quiz", "system-design", "case-study", "practical"]

export default function TestCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filteredTests = ALL_TESTS.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || test.difficulty === selectedDifficulty
    const matchesType = selectedType === "All" || test.type === selectedType

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.completions - a.completions
      case "newest":
        return b.id - a.id
      default:
        return b.featured ? 1 : -1
    }
  })

  const featuredTests = ALL_TESTS.filter((test) => test.featured)
  const stats = {
    totalTests: ALL_TESTS.length,
    categories: CATEGORIES.length - 1,
    avgRating: 4.6,
    totalCompletions: ALL_TESTS.reduce((sum, test) => sum + test.completions, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Catalog</h1>
          <p className="text-gray-600 mt-1">Explore our comprehensive library of interview preparation materials</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalTests}</div>
            <div className="text-sm text-gray-600">Tests</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{stats.categories}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{stats.avgRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tests, skills, or topics..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "All" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-6">
          {/* Test Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${test.color}-100`}>
                      <test.icon className={`w-5 h-5 text-${test.color}-600`} />
                    </div>
                    {test.featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="mt-2">{test.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {test.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {test.duration}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {test.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {test.completions.toLocaleString()}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          test.difficulty === "Easy"
                            ? "text-green-600 border-green-200"
                            : test.difficulty === "Medium"
                              ? "text-yellow-600 border-yellow-200"
                              : "text-red-600 border-red-200"
                        }`}
                      >
                        {test.difficulty}
                      </Badge>
                    </div>

                    {/* Action */}
                    <Button asChild className="w-full">
                      <Link href={`/test/${test.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Test
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No tests found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow border-2 border-yellow-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${test.color}-100`}>
                      <test.icon className={`w-5 h-5 text-${test.color}-600`} />
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">⭐ Featured</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="mt-2">{test.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {test.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {test.duration}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {test.rating}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {test.difficulty}
                      </Badge>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/test/${test.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Featured Test
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Based on your resume, goals, and previous performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Complete your profile for recommendations</h3>
                <p className="text-gray-600 mb-4">
                  Upload your resume and set your goals to get personalized test recommendations
                </p>
                <Button asChild>
                  <Link href="/onboarding">Complete Setup</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
