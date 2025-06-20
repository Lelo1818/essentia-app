import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  MessageCircle, 
  Zap, 
  Bell, 
  Star, 
  TrendingUp,
  X,
  ChevronUp,
  Sparkles
} from "lucide-react";

export function FloatingNotification({ 
  message, 
  type = "info", 
  onClose 
}: { 
  message: string; 
  type?: "info" | "success" | "warning" | "error";
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: "bg-blue-500 border-blue-400",
    success: "bg-green-500 border-green-400", 
    warning: "bg-yellow-500 border-yellow-400",
    error: "bg-red-500 border-red-400"
  };

  return (
    <div className={cn(
      "fixed top-20 right-4 z-50 transition-all duration-300 transform",
      visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      <Card className={cn("border-l-4 shadow-lg", colors[type])}>
        <CardContent className="p-4 flex items-center space-x-3">
          <div className="flex-1 text-sm text-gray-700">{message}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! Sou seu assistente IA do Flow Ecosystem. Como posso ajudar?" }
  ]);

  return (
    <>
      {/* Chat Button */}
      <button
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600",
          "rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200",
          "flex items-center justify-center text-white z-50 group"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">3</span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">IA Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "p-3 rounded-lg max-w-[80%]",
                msg.role === "assistant" 
                  ? "bg-gray-100 text-gray-800 mr-auto" 
                  : "bg-blue-500 text-white ml-auto"
              )}>
                {msg.content}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Digite sua pergunta..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.target.value.trim();
                    if (value) {
                      setMessages(prev => [...prev, 
                        { role: "user", content: value },
                        { role: "assistant", content: "Entendi! Vou analisar isso com a IA..." }
                      ]);
                      e.target.value = '';
                    }
                  }
                }}
              />
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 left-6 w-12 h-12 bg-gray-800 text-white",
        "rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200",
        "flex items-center justify-center z-50"
      )}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

export function SuccessAnimation({ visible, onComplete }: { visible: boolean; onComplete: () => void }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl animate-pulse">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Sucesso!</h3>
          <p className="text-gray-600">Operação concluída com êxito</p>
        </div>
      </div>
    </div>
  );
}

export function LiveStats() {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    transactions: 8924,
    learningHours: 15632
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        learningHours: prev.learningHours + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 left-4 z-40">
      <Card className="bg-black/80 text-white border-gray-700">
        <CardContent className="p-3">
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{stats.activeUsers.toLocaleString()} online</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              <span>{stats.transactions.toLocaleString()} transações</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>{stats.learningHours.toLocaleString()}h estudo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}