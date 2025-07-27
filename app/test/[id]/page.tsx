"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Code,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Lightbulb,
  Terminal,
  FileText,
  Zap,
  ArrowLeft,
  Maximize2,
  Copy,
  Download,
} from "lucide-react"

// Mock test data
const MOCK_TEST = {
  id: 1,
  title: "Two Sum Problem",
  type: "coding",
  difficulty: "Easy",
  category: "Array",
  timeLimit: 45, // minutes
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  starterCode: {
    javascript: `function twoSum(nums, target) {
    // Your code here
    
}`,
    python: `def two_sum(nums, target):
    # Your code here
    pass`,
    java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        
    }
};`,
  },
  testCases: [
    { input: "[2,7,11,15], 9", expected: "[0,1]", hidden: false },
    { input: "[3,2,4], 6", expected: "[1,2]", hidden: false },
    { input: "[3,3], 6", expected: "[0,1]", hidden: false },
    { input: "[1,2,3,4,5], 9", expected: "[3,4]", hidden: true },
    { input: "[-1,-2,-3,-4,-5], -8", expected: "[2,4]", hidden: true },
  ],
  hints: [
    "Try using a hash map to store the numbers you've seen and their indices.",
    "For each number, check if its complement (target - current number) exists in the hash map.",
    "Don't forget to handle the case where the same element cannot be used twice.",
  ],
  solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(MOCK_TEST.starterCode.javascript)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [showHint, setShowHint] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "completed">("idle")

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(MOCK_TEST.starterCode[language as keyof typeof MOCK_TEST.starterCode])
    setTestResults([])
  }

  const runCode = async () => {
    setIsRunning(true)
    setTestStatus("running")

    // Simulate code execution with progress
    const results: any[] = []

    for (let i = 0; i < MOCK_TEST.testCases.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const testCase = MOCK_TEST.testCases[i]
      const passed = Math.random() > 0.3 // 70% pass rate for demo

      results.push({
        id: i,
        input: testCase.input,
        expected: testCase.expected,
        actual: passed ? testCase.expected : "Error: Index out of bounds",
        passed,
        runtime: Math.floor(Math.random() * 100) + 50,
        memory: Math.floor(Math.random() * 20) + 10,
        hidden: testCase.hidden,
      })

      setTestResults([...results])
    }

    setIsRunning(false)
    setTestStatus("completed")
  }

  const resetCode = () => {
    setCode(MOCK_TEST.starterCode[selectedLanguage as keyof typeof MOCK_TEST.starterCode])
    setTestResults([])
    setShowHint(false)
    setCurrentHint(0)
    setTestStatus("idle")
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `two-sum.${selectedLanguage === "javascript" ? "js" : selectedLanguage}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const passedTests = testResults.filter((result) => result.passed).length
  const totalTests = testResults.length
  const visibleTests = testResults.filter((result) => !result.hidden).length
  const passedVisibleTests = testResults.filter((result) => result.passed && !result.hidden).length

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const timeRemaining = Math.max(0, MOCK_TEST.timeLimit * 60 - timeElapsed)

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : ""}`}>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{MOCK_TEST.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant={
                    MOCK_TEST.difficulty === "Easy"
                      ? "secondary"
                      : MOCK_TEST.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {MOCK_TEST.difficulty}
                </Badge>
                <Badge variant="outline">{MOCK_TEST.category}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {MOCK_TEST.type.charAt(0).toUpperCase() + MOCK_TEST.type.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatTime(timeElapsed)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Elapsed</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${timeRemaining < 300 ? "text-red-600" : "text-blue-600"}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Remaining</div>
            </div>
            <Button variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)}>
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                <FileText className="w-5 h-5 mr-2" />
                Problem Description
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="description" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="constraints">Constraints</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{MOCK_TEST.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="space-y-4">
                  {MOCK_TEST.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Example {index + 1}:</strong>
                        </div>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Input:</strong>{" "}
                          <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-900 dark:text-gray-100">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Output:</strong>{" "}
                          <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-900 dark:text-gray-100">
                            {example.output}
                          </code>
                        </div>
                        <div>
                          <strong className="text-gray-900 dark:text-gray-100">Explanation:</strong>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{example.explanation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="constraints" className="space-y-2">
                  {MOCK_TEST.constraints.map((constraint, index) => (
                    <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      • {constraint}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="hints" className="space-y-4">
                  {MOCK_TEST.hints.map((hint, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        index <= currentHint
                          ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">Hint {index + 1}</span>
                        </div>
                        {index > currentHint && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentHint(index)}
                            className="bg-transparent"
                          >
                            Reveal
                          </Button>
                        )}
                      </div>
                      {index <= currentHint && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{hint}</p>}
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                    <Code className="w-5 h-5 mr-2" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" onClick={copyCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadCode}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetCode} className="bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Code Textarea */}
                  <div className="relative">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono text-sm min-h-[300px] resize-none bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      placeholder="Write your solution here..."
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                      Lines: {code.split("\n").length} | Chars: {code.length}
                    </div>
                  </div>

                  {/* Run Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Press Ctrl+Enter to run your code</div>
                    <Button onClick={runCode} disabled={isRunning}>
                      {isRunning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <Terminal className="w-5 h-5 mr-2" />
                      Test Results
                    </div>
                    <div className="flex items-center space-x-2">
                      {passedVisibleTests === visibleTests && visibleTests > 0 ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          All Visible Tests Passed
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          {passedVisibleTests}/{visibleTests} Visible Tests Passed
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                  {totalTests > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {passedTests}/{totalTests} tests passed
                        </span>
                      </div>
                      <Progress value={(passedTests / totalTests) * 100} />
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className={`p-3 rounded-lg border ${
                          result.passed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            )}
                            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                              Test Case {result.id + 1}
                              {result.hidden && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Hidden
                                </Badge>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {result.runtime}ms
                            </span>
                            <span className="flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              {result.memory}MB
                            </span>
                          </div>
                        </div>

                        <div className="text-sm space-y-1">
                          <div>
                            <strong className="text-gray-900 dark:text-gray-100">Input:</strong>{" "}
                            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-900 dark:text-gray-100">
                              {result.input}
                            </code>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-gray-100">Expected:</strong>{" "}
                            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-900 dark:text-gray-100">
                              {result.expected}
                            </code>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-gray-100">Actual:</strong>{" "}
                            <code
                              className={`px-1 rounded ml-1 text-gray-900 dark:text-gray-100 ${
                                result.passed ? "bg-green-200 dark:bg-green-800" : "bg-red-200 dark:bg-red-800"
                              }`}
                            >
                              {result.actual}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {passedVisibleTests === visibleTests && visibleTests > 0 && passedTests < totalTests && (
                    <Alert className="mt-4">
                      <AlertDescription className="text-gray-700 dark:text-gray-300">
                        Great! You passed all visible test cases. There are {totalTests - visibleTests} hidden test
                        cases that will be evaluated when you submit.
                      </AlertDescription>
                    </Alert>
                  )}

                  {passedTests === totalTests && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="font-medium text-green-800 dark:text-green-200">Congratulations!</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                        You've successfully solved this problem! All test cases passed.
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setShowSolution(true)}>
                          View Solution
                        </Button>
                        <Button size="sm">Submit Solution</Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Next Problem
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Solution Modal */}
            {showSolution && (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                    <span>Optimal Solution</span>
                    <Button variant="ghost" onClick={() => setShowSolution(false)}>
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{MOCK_TEST.solution}</code>
                    </pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">Time Complexity:</strong> O(n) - We iterate
                      through the array once.
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">Space Complexity:</strong> O(n) - We use a
                      hash map to store elements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
