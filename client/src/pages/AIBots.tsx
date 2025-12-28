import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Dumbbell,
  GraduationCap,
  DollarSign,
  Video,
  Share2,
  TrendingUp,
  Send,
  Loader2,
} from "lucide-react";

const BOT_TYPES = [
  {
    type: "training",
    name: "Training Bot",
    icon: Dumbbell,
    description: "Get position-specific drills, workouts, and training advice",
    color: "bg-blue-500",
    credits: 10,
  },
  {
    type: "recruiting",
    name: "Recruiting Bot",
    icon: GraduationCap,
    description: "College matching, timeline guidance, and email templates",
    color: "bg-green-500",
    credits: 20,
  },
  {
    type: "nil",
    name: "NIL Deal Bot",
    icon: DollarSign,
    description: "Find opportunities, negotiate deals, and maximize your value",
    color: "bg-yellow-500",
    credits: 30,
  },
  {
    type: "video_analysis",
    name: "Video Analysis Bot",
    icon: Video,
    description: "Analyze your swing, pitching mechanics, and fielding technique",
    color: "bg-purple-500",
    credits: 25,
  },
  {
    type: "social_media",
    name: "Social Media Bot",
    icon: Share2,
    description: "Content ideas, posting schedule, and engagement strategies",
    color: "bg-pink-500",
    credits: 15,
  },
  {
    type: "career_path",
    name: "Career Path Bot",
    icon: TrendingUp,
    description: "Draft projections, college vs pro decisions, career planning",
    color: "bg-orange-500",
    credits: 50,
  },
];

export default function AIBots() {
  const { toast } = useToast();
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);

  const { data: conversations } = trpc.aiBots.getConversations.useQuery();
  const { data: messages, isLoading: messagesLoading } = trpc.aiBots.getMessages.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId }
  );

  const startConversation = trpc.aiBots.startConversation.useMutation({
    onSuccess: (data) => {
      setConversationId(data.id);
      toast({
        title: "Conversation Started",
        description: `You're now chatting with ${BOT_TYPES.find(b => b.type === selectedBot)?.name}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const sendMessage = trpc.aiBots.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBotSelect = (botType: string) => {
    setSelectedBot(botType);
    startConversation.mutate({ botType: botType as any });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !conversationId) return;

    sendMessage.mutate({
      conversationId,
      message: message.trim(),
    });
  };

  const selectedBotInfo = BOT_TYPES.find(b => b.type === selectedBot);

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Bot Assistant</h1>
        <p className="text-muted-foreground">
          Get personalized advice from AI-powered bots specialized in different areas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bot Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Bot</CardTitle>
              <CardDescription>Select a bot to start a conversation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {BOT_TYPES.map((bot) => {
                const Icon = bot.icon;
                return (
                  <Button
                    key={bot.type}
                    variant={selectedBot === bot.type ? "default" : "outline"}
                    className="w-full justify-start h-auto py-3"
                    onClick={() => handleBotSelect(bot.type)}
                  >
                    <div className="flex items-start gap-3 text-left">
                      <div className={`${bot.color} p-2 rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{bot.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {bot.description}
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          {bot.credits} credits
                        </Badge>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          {conversations && conversations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.slice(0, 5).map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedBot(conv.botType);
                      setConversationId(conv.id);
                    }}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    <span className="truncate">{conv.botType}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {selectedBotInfo ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className={`${selectedBotInfo.color}`}>
                      <AvatarFallback className="text-white">
                        {React.createElement(selectedBotInfo.icon, { className: "h-5 w-5" })}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedBotInfo.name}</CardTitle>
                      <CardDescription>{selectedBotInfo.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <ScrollArea className="flex-1 p-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : messages && messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
                        <p className="text-muted-foreground">
                          Ask me anything about {selectedBotInfo.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={sendMessage.isPending || !conversationId}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || sendMessage.isPending || !conversationId}
                    >
                      {sendMessage.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This conversation costs {selectedBotInfo.credits} credits
                  </p>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Bot to Start</h3>
                  <p className="text-muted-foreground">
                    Choose a bot from the left to begin your conversation
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
