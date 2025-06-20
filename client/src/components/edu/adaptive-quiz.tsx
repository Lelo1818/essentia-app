import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  CheckCircle, 
  X,
  Clock,
  Target,
  TrendingUp,
  Lightbulb,
  RotateCcw,
  Play
} from "lucide-react";

export default function AdaptiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = {
    title: "Leis de Newton - Quiz Adaptativo",
    topic: "Física - Mecânica",
    totalQuestions: 8,
    difficulty: "Intermediário",
    estimatedTime: "15 min",
    adaptiveLevel: "Baseado em seu desempenho anterior"
  };

  const questions = [
    {
      id: 1,
      difficulty: "easy",
      question: "Qual é a primeira lei de Newton?",
      explanation: "A primeira lei de Newton, também conhecida como lei da inércia, estabelece que um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a permanecer em movimento com velocidade constante, a menos que uma força externa atue sobre ele.",
      options: [
        "Todo corpo em repouso ou em movimento retilíneo uniforme permanece nesse estado, a menos que seja obrigado a mudá-lo por forças aplicadas sobre ele",
        "A força é diretamente proporcional à massa e à aceleração",
        "Para toda ação há sempre uma reação oposta e de igual intensidade",
        "A velocidade de um corpo é proporcional à força aplicada"
      ],
      correct: 0,
      userAnswer: null,
      timeSpent: 0
    },
    {
      id: 2,
      difficulty: "medium",
      question: "Um carro de massa 1000 kg acelera a 2 m/s². Qual a força aplicada?",
      explanation: "Usando a segunda lei de Newton (F = m × a), temos: F = 1000 kg × 2 m/s² = 2000 N. A segunda lei relaciona força, massa e aceleração.",
      options: [
        "500 N",
        "1000 N", 
        "2000 N",
        "4000 N"
      ],
      correct: 2,
      userAnswer: null,
      timeSpent: 0
    },
    {
      id: 3,
      difficulty: "hard",
      question: "Dois blocos (A=2kg e B=3kg) estão em contato sobre superfície sem atrito. Uma força de 10N é aplicada no bloco A. Qual a aceleração do conjunto?",
      explanation: "Como os blocos estão em contato e não há atrito, eles se movem juntos. Massa total = 2+3 = 5kg. F = m×a → 10 = 5×a → a = 2 m/s²",
      options: [
        "1 m/s²",
        "2 m/s²",
        "3 m/s²",
        "5 m/s²"
      ],
      correct: 1,
      userAnswer: null,
      timeSpent: 0
    }
  ];

  const [questionData, setQuestionData] = useState(questions);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Record answer
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    // Update question data
    const updatedQuestions = [...questionData];
    updatedQuestions[currentQuestion].userAnswer = selectedAnswer;
    setQuestionData(updatedQuestions);

    setSelectedAnswer(null);
    setShowResult(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      setQuizStarted(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === questionData[currentQuestion].correct;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="space-y-6">
        {/* Quiz Setup */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              {quiz.title}
            </CardTitle>
            <p className="text-sm text-gray-600">{quiz.topic}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{quiz.totalQuestions}</div>
                <div className="text-sm text-gray-600">Questões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{quiz.estimatedTime}</div>
                <div className="text-sm text-gray-600">Tempo Estimado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{quiz.difficulty}</div>
                <div className="text-sm text-gray-600">Nível</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">🧠</div>
                <div className="text-sm text-gray-600">IA Adaptativa</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h6 className="font-medium text-purple-800 mb-2">Como funciona o Quiz Adaptativo:</h6>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• A IA ajusta a dificuldade baseada em suas respostas</li>
                  <li>• Questões corretas → próxima questão mais difícil</li>
                  <li>• Questões erradas → próxima questão mais simples</li>
                  <li>• Maximiza seu aprendizado em menos tempo</li>
                </ul>
              </div>

              <Button 
                onClick={() => setQuizStarted(true)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Começar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Seu Histórico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">87%</div>
                <div className="text-sm text-gray-600">Média Geral</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Quizzes Feitos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">+12%</div>
                <div className="text-sm text-gray-600">Melhoria Semanal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{quiz.title}</h3>
              <p className="text-sm text-gray-600">
                Questão {currentQuestion + 1} de {questions.length}
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              IA Adaptativa
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={`${
              questionData[currentQuestion].difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              questionData[currentQuestion].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {questionData[currentQuestion].difficulty === 'easy' ? 'Fácil' :
               questionData[currentQuestion].difficulty === 'medium' ? 'Médio' : 'Difícil'}
            </Badge>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>2:30</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-800">
              {questionData[currentQuestion].question}
            </h4>

            <div className="space-y-3">
              {questionData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    selectedAnswer === index 
                      ? showResult 
                        ? index === questionData[currentQuestion].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : showResult && index === questionData[currentQuestion].correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questionData[currentQuestion].correct
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                        : showResult && index === questionData[currentQuestion].correct
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                    }`}>
                      {showResult && (selectedAnswer === index || index === questionData[currentQuestion].correct) && (
                        index === questionData[currentQuestion].correct 
                          ? <CheckCircle className="w-4 h-4 text-white" />
                          : selectedAnswer === index && <X className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start space-x-2 mb-3">
                  <Lightbulb className={`w-5 h-5 mt-0.5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <h6 className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Parabéns! Resposta correta!' : 'Ops! Resposta incorreta.'}
                    </h6>
                    <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {questionData[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1"
                >
                  Confirmar Resposta
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="flex-1"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                </Button>
              )}
              
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                Pular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h6 className="font-medium text-blue-800">IA Observando</h6>
              <p className="text-sm text-blue-700">
                {isCorrect && showResult 
                  ? "Ótimo! Vou aumentar um pouco a dificuldade da próxima questão."
                  : showResult 
                    ? "Sem problemas! A próxima questão será um pouco mais simples para reforçar o conceito."
                    : "Analisando seu padrão de resposta para personalizar as próximas questões..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}