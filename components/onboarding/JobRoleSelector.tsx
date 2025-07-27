"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Code, Database, Palette, BarChart3, Settings, Users, ArrowRight } from "lucide-react"

interface JobRoleSelectorProps {
  onComplete: (data: any) => void
}

const JOB_ROLES = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: Code,
    description: "React, Vue, Angular, JavaScript",
    category: "Engineering",
    popular: true,
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: Database,
    description: "Node.js, Python, Java, APIs",
    category: "Engineering",
    popular: true,
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    icon: Code,
    description: "Frontend + Backend development",
    category: "Engineering",
    popular: true,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: BarChart3,
    description: "Python, ML, Statistics, Analytics",
    category: "Data",
    popular: true,
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: Settings,
    description: "AWS, Docker, Kubernetes, CI/CD",
    category: "Engineering",
    popular: false,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    icon: Users,
    description: "Strategy, Roadmaps, Analytics",
    category: "Product",
    popular: true,
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    icon: Palette,
    description: "Figma, User Research, Prototyping",
    category: "Design",
    popular: false,
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: BarChart3,
    description: "SQL, Excel, Tableau, Python",
    category: "Data",
    popular: false,
  },
]

export function JobRoleSelector({ onComplete }: JobRoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(JOB_ROLES.map((role) => role.category)))]

  const filteredRoles = JOB_ROLES.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || role.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularRoles = filteredRoles.filter((role) => role.popular)
  const otherRoles = filteredRoles.filter((role) => !role.popular)

  const handleContinue = () => {
    const role = JOB_ROLES.find((r) => r.id === selectedRole)
    onComplete({
      targetRole: role,
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search job roles..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all" ? "All Roles" : category}
          </Button>
        ))}
      </div>

      {/* Popular Roles */}
      {popularRoles.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center">🔥 Popular Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularRoles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRole === role.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <role.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{role.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {role.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Roles */}
      {otherRoles.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">All Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherRoles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRole === role.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <role.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{role.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {role.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredRoles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No roles found matching your search.</p>
        </div>
      )}

      <Button onClick={handleContinue} className="w-full" disabled={!selectedRole}>
        Continue to Career Level
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
