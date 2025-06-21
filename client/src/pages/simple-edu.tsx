import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Target, 
  Clock, 
  Star,
  User,
  Baby,
  Crown,
  Home,
  Play
} from "lucide-react";

export default function SimpleEdu() {
  const [selectedAge, setSelectedAge] = useState("adult");

  const ageGroups = [
    { key: "child", icon: Baby, label: "Criança", color: "bg-pink-500" },
    { key: "teen", icon: User, label: "Adolescente", color: "bg-blue-500" },
    { key: "adult", icon: Crown, label: "Adulto", color: "bg-purple-500" }
  ];

  const courses = [
    {
      title: "Gestão Financeira Pessoal",
      description: "Domine investimentos e planejamento",
      duration: "60 min",
      level: "Avançado",
      progress: 65,
      icon: "💰"
    },
    {
      title: "Liderança e Comunicação",
      description: "Desenvolva habilidades de liderança",
      duration: "45 min", 
      level: "Intermediário",
      progress: 40,
      icon: "👥"
    },
    {
      title: "Inteligência Artificial",
      description: "Entenda e aplique IA no trabalho",
      duration: "90 min",
      level: "Avançado", 
      progress: 20,
      icon: "🤖"
    }
  ];

  const stats = {
    streak: 7,
    totalHours: 24,
    completedCourses: 4,
    level: 3
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EduVie</h1>
              <p className="text-sm text-gray-600">Educação Personalizada</p>
            </div>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.streak}</div>
            <p className="text-sm text-gray-600">Dias seguidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completedCourses}</div>
            <p className="text-sm text-gray-600">Cursos completos</p>
          </CardContent>
        </Card>
      </div>

      {/* Age Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Escolha sua faixa etária</h3>
        <div className="grid grid-cols-3 gap-3">
          {ageGroups.map((group) => {
            const Icon = group.icon;
            const isSelected = selectedAge === group.key;
            return (
              <Button
                key={group.key}
                variant={isSelected ? "default" : "outline"}
                className={`h-16 flex-col gap-2 ${isSelected ? group.color : ""}`}
                onClick={() => setSelectedAge(group.key)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{group.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Course Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Meta Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>12 de 15 horas</span>
              <span className="font-medium">80%</span>
            </div>
            <Progress value={80} className="h-3" />
            <p className="text-sm text-gray-600">
              Faltam 3 horas para bater sua meta!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cursos Recomendados</h3>
        {courses.map((course, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{course.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.description}</p>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span>{course.progress}% completo</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <Button size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}