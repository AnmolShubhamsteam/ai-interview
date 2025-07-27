"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Download,
  Share2,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  Code,
  Star,
  Award,
  RefreshCw,
  Eye,
} from "lucide-react"

const MOCK_RESULTS = [
  {
    id: 1,
    title: "Behavioral Interview: Leadership",
    type: "interview",
    date: "2024-01-15",
    duration: "28 min",
    overallScore: 85,
    categories: [
      { name: "Communication", score: 88, feedback: "Clear and articulate responses" },
      { name: "Leadership", score: 82, feedback: "Good examples, could be more specific" },
      { name: "Problem Solving", score: 87, feedback: "Excellent analytical approach" },
      { name: "STAR Method", score: 83, feedback: "Well-structured answers" },
    ],
    aiAnalysis: {
      strengths: [
        "Excellent communication skills and clear articulation",
        "Strong problem-solving approach with logical thinking",
        "Good use of specific examples from experience",
      ],
      improvements: [
        "Include more quantifiable results in your examples",
        "Practice the STAR method for more structured responses",
        "Work on reducing filler words and pauses",
      ],
      keyInsights:
        "Your responses show strong leadership potential. Focus on providing more specific metrics and outcomes to strengthen your impact stories.",
    },
    transcript: [
      {
        question: "Tell me about a time when you had to lead a difficult project.",
        response:
          "In my previous role as a senior developer, I was tasked with leading a critical system migration that had been delayed multiple times...",
        feedback: "Good start with context setting. The response demonstrates leadership experience effectively.",
      },
    ],
  },
  {
    id: 2,
    title: "React Component Challenge",
    type: "coding",
    date: "2024-01-14",
    duration: "42 min",
    overallScore: 92,
    categories: [
      { name: "Code Quality", score: 95, feedback: "Clean, readable code with good practices" },
      { name: "Problem Solving", score: 90, feedback: "Efficient algorithm implementation" },
      { name: "Testing", score: 88, feedback: "Good test coverage" },
      { name: "Performance", score: 94, feedback: "Optimized solution" },
    ],
    codeSubmission: `function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}`,
    testResults: {
      passed: 8,
      total: 10,
      runtime: "45ms",
      memory: "12.3MB",
    },
  },
  {
    id: 3,
    title: "System Design: Chat Application",
    type: "system-design",
    date: "2024-01-12",
    duration: "58 min",
    overallScore: 78,
    categories: [
      { name: "Architecture", score: 80, feedback: "Good high-level design approach" },
      { name: "Scalability", score: 75, feedback: "Consider more scaling strategies" },
      { name: "Database Design", score: 82, feedback: "Well-thought database schema" },
      { name: "Communication", score: 76, feedback: "Clear explanation of design choices" },
    ],
    designArtifacts: [
      "High-level architecture diagram",
      "Database schema design",
      "API endpoint specifications",
      "Scaling considerations document",
    ],
  },
]

export default function ResultsPage() {
  const [selectedResult, setSelectedResult] = useState(MOCK_RESULTS[0])
  const [activeTab, setActiveTab] = useState("overview")

  const downloadReport = () => {
    // Mock download functionality
    console.log("Downloading report for:", selectedResult.title)
  }

  const shareResult = () => {
    // Mock share functionality
    console.log("Sharing result:", selectedResult.title)
  }

  const retakeTest = () => {
    // Mock retake functionality
    console.log("Retaking test:", selectedResult.title)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 80) return "secondary"
    if (score >= 70) return "outline"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Results & Feedback</h1>
          <p className="text-gray-600 mt-1">Review your performance and get AI-powered insights</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={shareResult}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={downloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Results List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_RESULTS.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedResult.id === result.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {result.type}
                    </Badge>
                    <span className={`text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}%
                    </span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{result.title}</h4>
                  <div className="flex items-center text-xs text-gray-600 space-x-2">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {result.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    {selectedResult.type === "interview" && <MessageSquare className="w-5 h-5 mr-2" />}
                    {selectedResult.type === "coding" && <Code className="w-5 h-5 mr-2" />}
                    {selectedResult.type === "system-design" && <BarChart3 className="w-5 h-5 mr-2" />}
                    {selectedResult.title}
                  </CardTitle>
                  <CardDescription>
                    Completed on {new Date(selectedResult.date).toLocaleDateString()} • {selectedResult.duration}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedResult.overallScore)}`}>
                    {selectedResult.overallScore}%
                  </div>
                  <Badge variant={getScoreBadgeVariant(selectedResult.overallScore)}>
                    {selectedResult.overallScore >= 90
                      ? "Excellent"
                      : selectedResult.overallScore >= 80
                        ? "Good"
                        : selectedResult.overallScore >= 70
                          ? "Fair"
                          : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="improvement">Improvement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Score Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedResult.categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}%</span>
                          </div>
                          <Progress value={category.score} />
                          <p className="text-sm text-gray-600">{category.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedResult.overallScore}%</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedResult.categories.filter((c) => c.score >= 80).length}
                      </div>
                      <div className="text-sm text-gray-600">Strong Areas</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedResult.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedResult.type === "coding"
                          ? `${selectedResult.testResults?.passed}/${selectedResult.testResults?.total}`
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">Tests Passed</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-6 mt-6">
                  {selectedResult.aiAnalysis && (
                    <div className="space-y-6">
                      {/* Key Insights */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Target className="w-5 h-5 mr-2" />
                            Key Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{selectedResult.aiAnalysis.keyInsights}</p>
                        </CardContent>
                      </Card>

                      {/* Strengths */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg text-green-700">
                            <Award className="w-5 h-5 mr-2" />
                            Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedResult.aiAnalysis.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Areas for Improvement */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg text-blue-700">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedResult.aiAnalysis.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details" className="space-y-6 mt-6">
                  {selectedResult.type === "interview" && selectedResult.transcript && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Interview Transcript</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedResult.transcript.map((item, index) => (
                            <div key={index} className="border-l-4 border-blue-200 pl-4">
                              <div className="font-medium text-blue-900 mb-2">Q: {item.question}</div>
                              <div className="text-gray-700 mb-2">A: {item.response}</div>
                              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">💡 {item.feedback}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedResult.type === "coding" && selectedResult.codeSubmission && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Code Submission</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{selectedResult.codeSubmission}</code>
                          </pre>
                        </div>
                        {selectedResult.testResults && (
                          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-green-600">
                                {selectedResult.testResults.passed}/{selectedResult.testResults.total}
                              </div>
                              <div className="text-sm text-gray-600">Tests Passed</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-600">
                                {selectedResult.testResults.runtime}
                              </div>
                              <div className="text-sm text-gray-600">Runtime</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {selectedResult.testResults.memory}
                              </div>
                              <div className="text-sm text-gray-600">Memory</div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {selectedResult.type === "system-design" && selectedResult.designArtifacts && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Design Artifacts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {selectedResult.designArtifacts.map((artifact, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">{artifact}</span>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="improvement" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Recommended Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Practice Recommendations</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Take similar tests to reinforce learning</li>
                            <li>• Focus on areas with scores below 80%</li>
                            <li>• Review provided resources and examples</li>
                          </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Button className="w-full" onClick={retakeTest}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retake This Test
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Star className="w-4 h-4 mr-2" />
                            Similar Tests
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Study Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">STAR Method Guide</div>
                            <div className="text-sm text-gray-600">Master behavioral interview responses</div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Leadership Scenarios Practice</div>
                            <div className="text-sm text-gray-600">Additional practice questions</div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Practice
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Communication Skills Workshop</div>
                            <div className="text-sm text-gray-600">Improve articulation and clarity</div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Enroll
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
