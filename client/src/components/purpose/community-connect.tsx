import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  UserPlus,
  Globe,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  Coffee
} from "lucide-react";

export default function CommunityConnect() {
  const [selectedTab, setSelectedTab] = useState("feed");

  const communityPosts = [
    {
      id: 1,
      author: {
        name: "Marina Silva",
        avatar: "/api/placeholder/40/40",
        level: "Alma Iluminada",
        location: "São Paulo, SP"
      },
      timestamp: "2 horas atrás",
      category: "breakthrough",
      content: "Após 6 meses de jornada, finalmente tive coragem de deixar meu emprego corporativo para seguir minha paixão por arte terapia. O medo ainda existe, but a clareza sobre meu propósito é mais forte!",
      tags: ["coragem", "transição", "arte-terapia"],
      engagement: {
        likes: 24,
        comments: 8,
        shares: 3
      },
      comments: [
        {
          author: "Carlos Mendes",
          content: "Que inspiração! Passei por algo similar ano passado. A ansiedade inicial compensa quando você está alinhado.",
          timestamp: "1 hora atrás"
        },
        {
          author: "Ana Costa",
          content: "Marina, você me inspirou a acelerar minha própria transição. Obrigada por compartilhar! 💙",
          timestamp: "30 min atrás"
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Roberto Lima",
        avatar: "/api/placeholder/40/40",
        level: "Buscador Avançado", 
        location: "Rio de Janeiro, RJ"
      },
      timestamp: "4 horas atrás",
      category: "reflection",
      content: "Reflexão de hoje: percebi que minha necessidade de controle vem do medo de decepcionar outros. Quando aceito que não posso controlar tudo, sinto uma leveza incrível. Como vocês lidam com perfeccionismo?",
      tags: ["controle", "perfeccionismo", "aceitação"],
      engagement: {
        likes: 18,
        comments: 12,
        shares: 2
      }
    },
    {
      id: 3,
      author: {
        name: "Lucia Fernandez",
        avatar: "/api/placeholder/40/40",
        level: "Visionária",
        location: "Belo Horizonte, MG"
      },
      timestamp: "6 horas atrás",
      category: "achievement",
      content: "Completei meu mapa de valores hoje! Os 5 principais: autenticidade, compaixão, crescimento, liberdade e conexão. Incrível como isso traz clareza para decisões do dia a dia. Quais são os seus valores centrais?",
      tags: ["valores", "clareza", "decisões"],
      engagement: {
        likes: 31,
        comments: 15,
        shares: 7
      }
    }
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Pedro Santos",
      level: "Alma em Evolução",
      commonInterests: ["tecnologia", "educação", "impacto-social"],
      location: "São Paulo, SP",
      journeyStage: "Descoberta de Paixões",
      compatibility: 89,
      reason: "Mesma paixão por tecnologia educacional"
    },
    {
      id: 2,
      name: "Julia Oliveira", 
      level: "Buscadora Iniciante",
      commonInterests: ["escrita", "psicologia", "autoconhecimento"],
      location: "Brasília, DF",
      journeyStage: "Autoconhecimento Profundo",
      compatibility: 76,
      reason: "Valores similares de autenticidade e crescimento"
    },
    {
      id: 3,
      name: "Marcos Pereira",
      level: "Visionário",
      commonInterests: ["empreendedorismo", "sustentabilidade", "inovação"],
      location: "Florianópolis, SC",
      journeyStage: "Vida com Propósito",
      compatibility: 82,
      reason: "Mentor potencial com experiência em transição"
    }
  ];

  const discussionGroups = [
    {
      id: 1,
      name: "Transição de Carreira",
      description: "Para quem está mudando de profissão ou questionando a atual",
      members: 1247,
      activeNow: 23,
      recentTopics: [
        "Como explicar gap no currículo?",
        "Networking durante transição",
        "Quando saber que é hora de mudar?"
      ],
      category: "carreira"
    },
    {
      id: 2,
      name: "Relacionamentos Conscientes",
      description: "Construindo conexões mais profundas e autênticas",
      members: 892,
      activeNow: 15,
      recentTopics: [
        "Vulnerabilidade vs. privacidade",
        "Como melhorar comunicação em família",
        "Limites saudáveis em amizades"
      ],
      category: "relacionamentos"
    },
    {
      id: 3,
      name: "Empreendedores com Propósito",
      description: "Negócios que geram impacto positivo no mundo",
      members: 634,
      activeNow: 8,
      recentTopics: [
        "Equilibrio lucro vs. propósito",
        "Como validar negócio de impacto",
        "Investidores que valorizam propósito"
      ],
      category: "empreendedorismo"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Círculo de Reflexão: Encontrando Coragem",
      date: "2025-06-25",
      time: "19:00",
      type: "online",
      facilitator: "Dra. Maria Santos",
      participants: 12,
      maxParticipants: 15,
      description: "Espaço seguro para explorar medos que nos impedem de seguir nosso propósito"
    },
    {
      id: 2,
      title: "Workshop: Construindo Missão Pessoal",
      date: "2025-06-28",
      time: "10:00",
      type: "presencial",
      location: "São Paulo - Vila Madalena",
      facilitator: "Carlos Mendonça",
      participants: 8,
      maxParticipants: 12,
      description: "Processo guiado para criar sua declaração de missão autêntica"
    },
    {
      id: 3,
      title: "Mentoria em Grupo: Transição Profissional",
      date: "2025-07-02",
      time: "20:00",
      type: "online",
      facilitator: "Ana Rodrigues",
      participants: 6,
      maxParticipants: 8,
      description: "Sessão de mentoria para quem está mudando de carreira"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      breakthrough: "bg-green-100 text-green-700",
      reflection: "bg-blue-100 text-blue-700",
      achievement: "bg-purple-100 text-purple-700",
      question: "bg-yellow-100 text-yellow-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakthrough': return TrendingUp;
      case 'reflection': return BookOpen;
      case 'achievement': return Target;
      case 'question': return MessageCircle;
      default: return MessageCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Comunidade Purpose
          </CardTitle>
          <p className="text-sm text-gray-600">
            Conecte-se com pessoas em jornadas similares de autoconhecimento
          </p>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-2">
        {[
          { id: "feed", label: "Feed", icon: Globe },
          { id: "connections", label: "Conexões", icon: UserPlus },
          { id: "groups", label: "Grupos", icon: Users },
          { id: "events", label: "Eventos", icon: Calendar }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTab(tab.id)}
              className="flex items-center space-x-1"
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {selectedTab === "feed" && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Compartilhe uma reflexão, conquista ou pergunta com a comunidade..."
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className="cursor-pointer">💭 Reflexão</Badge>
                      <Badge variant="secondary" className="cursor-pointer">🎯 Conquista</Badge>
                      <Badge variant="secondary" className="cursor-pointer">❓ Pergunta</Badge>
                    </div>
                    <Button size="sm">Compartilhar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {communityPosts.map((post) => {
            const CategoryIcon = getCategoryIcon(post.category);
            return (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-800">{post.author.name}</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Badge variant="secondary" className="text-xs">
                              {post.author.level}
                            </Badge>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(post.category)}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <div className="text-gray-700">{post.content}</div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.engagement.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.engagement.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-1" />
                          {post.engagement.shares}
                        </Button>
                      </div>
                    </div>

                    {/* Comments Preview */}
                    {post.comments && (
                      <div className="space-y-3 pt-3 border-t bg-gray-50 p-3 rounded-lg">
                        {post.comments.slice(0, 2).map((comment, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="text-sm">
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-gray-600 ml-2">{comment.content}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{comment.timestamp}</div>
                            </div>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Ver todos os comentários
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedTab === "connections" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedConnections.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-800">{person.name}</h4>
                          <Badge variant="secondary" className="text-xs">{person.level}</Badge>
                          <div className="text-sm text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {person.location}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {person.compatibility}% compatível
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Etapa:</span>
                        <span className="ml-2 text-gray-600">{person.journeyStage}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Interesses comuns:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {person.commonInterests.map((interest, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-700">{person.reason}</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Conectar
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Mensagem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "groups" && (
        <div className="space-y-4">
          {discussionGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{group.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                    </div>
                    <Badge variant="secondary">{group.category}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members.toLocaleString()} membros</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{group.activeNow} online agora</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium text-sm text-gray-700">Tópicos recentes:</div>
                    <ul className="space-y-1">
                      {group.recentTopics.map((topic, i) => (
                        <li key={i} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button size="sm" className="w-full">
                    Participar do Grupo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "events" && (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                    <Badge className={event.type === "online" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                      {event.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700">Data</div>
                      <div className="text-gray-600">{new Date(event.date).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Horário</div>
                      <div className="text-gray-600">{event.time}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Facilitador</div>
                      <div className="text-gray-600">{event.facilitator}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Vagas</div>
                      <div className="text-gray-600">{event.participants}/{event.maxParticipants}</div>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Participar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Coffee className="w-4 h-4 mr-1" />
                      Interesse
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}