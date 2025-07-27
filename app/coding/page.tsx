"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Play, RotateCcw, CheckCircle, XCircle, Clock, Lightbulb, Terminal, FileText, Zap } from "lucide-react"

const CODING_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
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
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses.",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      javascript: `function isValid(s) {
    // Your code here
    
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Your code here
    
}`,
    },
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
    ],
  },
]

export default function CodingPracticePage() {
  const [selectedProblem, setSelectedProblem] = useState(CODING_PROBLEMS[0])
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(selectedProblem.starterCode.javascript)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [showHint, setShowHint] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(selectedProblem.starterCode[language as keyof typeof selectedProblem.starterCode])
  }

  const handleProblemChange = (problemId: number) => {
    const problem = CODING_PROBLEMS.find((p) => p.id === problemId)
    if (problem) {
      setSelectedProblem(problem)
      setCode(problem.starterCode[selectedLanguage as keyof typeof problem.starterCode])
      setTestResults([])
      setShowHint(false)
    }
  }

  const runCode = async () => {
    setIsRunning(true)

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock test results
    const mockResults = selectedProblem.testCases.map((testCase, index) => ({
      id: index,
      input: testCase.input,
      expected: testCase.expected,
      actual: index === 0 ? testCase.expected : "Error", // First test passes, others fail for demo
      passed: index === 0,
      runtime: Math.floor(Math.random() * 100) + 50,
      memory: Math.floor(Math.random() * 20) + 10,
    }))

    setTestResults(mockResults)
    setIsRunning(false)
  }

  const resetCode = () => {
    setCode(selectedProblem.starterCode[selectedLanguage as keyof typeof selectedProblem.starterCode])
    setTestResults([])
    setShowHint(false)
  }

  const passedTests = testResults.filter((result) => result.passed).length
  const totalTests = testResults.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Coding Practice</h1>
          <p className="text-gray-600 mt-1">Sharpen your programming skills with interactive challenges</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600">Time Elapsed</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Problem
              </CardTitle>
              <Select
                value={selectedProblem.id.toString()}
                onValueChange={(value) => handleProblemChange(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CODING_PROBLEMS.map((problem) => (
                    <SelectItem key={problem.id} value={problem.id.toString()}>
                      {problem.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  selectedProblem.difficulty === "Easy"
                    ? "secondary"
                    : selectedProblem.difficulty === "Medium"
                      ? "default"
                      : "destructive"
                }
              >
                {selectedProblem.difficulty}
              </Badge>
              <Badge variant="outline">{selectedProblem.category}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="description" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedProblem.title}</h3>
                  <p className="text-gray-700">{selectedProblem.description}</p>
                </div>

                {showHint && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">Hint</span>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Try using a hash map to store the numbers you've seen and their indices. For each number, check if
                      its complement (target - current number) exists in the map.
                    </p>
                  </div>
                )}

                <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Input:</strong> <code className="bg-gray-200 px-1 rounded">{example.input}</code>
                      </div>
                      <div>
                        <strong>Output:</strong> <code className="bg-gray-200 px-1 rounded">{example.output}</code>
                      </div>
                      <div>
                        <strong>Explanation:</strong> {example.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="constraints" className="space-y-2">
                {selectedProblem.constraints.map((constraint, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {constraint}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
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
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={resetCode}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Code Textarea (In a real app, you'd use Monaco Editor) */}
                <div className="relative">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[300px] resize-none"
                    placeholder="Write your solution here..."
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    Lines: {code.split("\n").length}
                  </div>
                </div>

                {/* Run Button */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Use Ctrl+Enter to run your code</div>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    Test Results
                  </div>
                  <div className="flex items-center space-x-2">
                    {passedTests === totalTests ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        All Tests Passed
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="w-3 h-3 mr-1" />
                        {passedTests}/{totalTests} Passed
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                {totalTests > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
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
                        result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {result.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="font-medium text-sm">Test Case {result.id + 1}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
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
                          <strong>Input:</strong> <code className="bg-gray-200 px-1 rounded">{result.input}</code>
                        </div>
                        <div>
                          <strong>Expected:</strong> <code className="bg-gray-200 px-1 rounded">{result.expected}</code>
                        </div>
                        <div>
                          <strong>Actual:</strong>
                          <code className={`px-1 rounded ml-1 ${result.passed ? "bg-green-200" : "bg-red-200"}`}>
                            {result.actual}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {passedTests === totalTests && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">Congratulations!</span>
                    </div>
                    <p className="text-green-700 text-sm mb-3">
                      You've successfully solved this problem! Your solution passed all test cases.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Solution
                      </Button>
                      <Button size="sm">Next Problem</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
