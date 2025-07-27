"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Clock,
  User,
  Bot,
  Volume2,
  VolumeX,
} from "lucide-react"

const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: "Tell me about yourself and your background in software development.",
    category: "Introduction",
    timeLimit: 120,
    tips: "Focus on your professional journey, key achievements, and what drives you in tech.",
  },
  {
    id: 2,
    question: "Describe a challenging project you worked on and how you overcame the obstacles.",
    category: "Problem Solving",
    timeLimit: 180,
    tips: "Use the STAR method: Situation, Task, Action, Result. Be specific about your role.",
  },
  {
    id: 3,
    question: "How do you handle conflicts with team members or stakeholders?",
    category: "Teamwork",
    timeLimit: 150,
    tips: "Show emotional intelligence and focus on resolution strategies.",
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years, and how does this role fit into your career goals?",
    category: "Career Goals",
    timeLimit: 120,
    tips: "Align your goals with the company's growth opportunities.",
  },
  {
    id: 5,
    question: "Tell me about a time when you had to learn a new technology quickly.",
    category: "Learning",
    timeLimit: 150,
    tips: "Demonstrate your learning process and how you apply new knowledge.",
  },
]

export default function MockInterviewPage() {
  const [interviewState, setInterviewState] = useState<"setup" | "active" | "completed">("setup")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [responses, setResponses] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(true)

  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / INTERVIEW_QUESTIONS.length) * 100

  const startInterview = () => {
    setInterviewState("active")
    setTimeRemaining(currentQuestion.timeLimit)
    // Start timer logic would go here
  }

  const handleNextQuestion = () => {
    const newResponses = [...responses]
    newResponses[currentQuestionIndex] = currentResponse
    setResponses(newResponses)
    setCurrentResponse("")

    if (currentQuestionIndex < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeRemaining(INTERVIEW_QUESTIONS[currentQuestionIndex + 1].timeLimit)
    } else {
      setInterviewState("completed")
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setCurrentResponse(responses[currentQuestionIndex - 1] || "")
      setTimeRemaining(INTERVIEW_QUESTIONS[currentQuestionIndex - 1].timeLimit)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Recording logic would go here
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    // Pause timer logic would go here
  }

  const restartInterview = () => {
    setInterviewState("setup")
    setCurrentQuestionIndex(0)
    setResponses([])
    setCurrentResponse("")
    setIsRecording(false)
    setIsPaused(false)
  }

  if (interviewState === "setup") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mock Interview Practice</h1>
          <p className="text-gray-600">Practice behavioral interviews with AI-powered feedback</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Behavioral Interview Session
            </CardTitle>
            <CardDescription>Practice common behavioral questions with our AI interviewer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Interview Preview */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What to Expect:</h3>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>• {INTERVIEW_QUESTIONS.length} behavioral questions</li>
                <li>• 2-3 minutes per question</li>
                <li>• AI-powered feedback and scoring</li>
                <li>• Practice using the STAR method</li>
                <li>• Voice recording and text input options</li>
              </ul>
            </div>

            {/* Question Preview */}
            <div>
              <h3 className="font-medium mb-3">Questions Preview:</h3>
              <div className="space-y-2">
                {INTERVIEW_QUESTIONS.map((q, index) => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Q{index + 1}: </span>
                      <span className="text-sm">{q.question}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {q.category}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {Math.floor(q.timeLimit / 60)}:{(q.timeLimit % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Interview Settings:</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="audio"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                  />
                  <label htmlFor="audio" className="text-sm">
                    Enable audio feedback
                  </label>
                </div>
                <Button onClick={startInterview} size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Interview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (interviewState === "active") {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview in Progress</h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {INTERVIEW_QUESTIONS.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-600">Time Remaining</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Interview Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Interviewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI Interviewer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-300"}`} />
                  <span className="text-sm text-gray-600">{isRecording ? "Listening..." : "Ready to listen"}</span>
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{currentQuestion.category}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => setAudioEnabled(!audioEnabled)}>
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="font-medium text-blue-900 mb-2">{currentQuestion.question}</p>
                <p className="text-sm text-blue-700">💡 {currentQuestion.tips}</p>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                  Previous
                </Button>
                <Button variant={isPaused ? "default" : "outline"} size="sm" onClick={togglePause}>
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextQuestion}>
                  <SkipForward className="w-4 h-4 mr-1" />
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Response Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Your Response
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Recording Controls */}
              <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  onClick={toggleRecording}
                  className="flex items-center space-x-2"
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
                </Button>

                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-red-600">Recording...</span>
                  </div>
                )}
              </div>

              {/* Text Response */}
              <div>
                <label className="block text-sm font-medium mb-2">Or type your response:</label>
                <Textarea
                  placeholder="Share your thoughts here... Use the STAR method: Situation, Task, Action, Result"
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">{currentResponse.length} characters</div>
              </div>

              {/* STAR Method Helper */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">STAR Method Framework:</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <div>
                    <strong>S</strong>ituation: Set the context
                  </div>
                  <div>
                    <strong>T</strong>ask: Describe your responsibility
                  </div>
                  <div>
                    <strong>A</strong>ction: Explain what you did
                  </div>
                  <div>
                    <strong>R</strong>esult: Share the outcome
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={restartInterview}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Interview
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </Button>
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1 ? "Finish Interview" : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Completed state
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Interview Completed! 🎉</h1>
        <p className="text-gray-600">Great job! Your responses are being analyzed by our AI.</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Processing Your Interview</h3>
          <p className="text-gray-600 mb-6">Our AI is analyzing your responses and preparing detailed feedback...</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={restartInterview} variant="outline">
              Take Another Interview
            </Button>
            <Button asChild>
              <a href="/results">View Results</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
