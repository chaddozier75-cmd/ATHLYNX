import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  MessageCircle, 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Users,
  Star,
  CheckCheck,
  Paperclip,
  Smile,
  Image,
  Mic,
  ArrowLeft,
  Bell,
  Settings,
  Plus,
  Filter
} from "lucide-react";
import { toast } from "sonner";

const conversations = [
  {
    id: 1,
    name: "Coach Mike Thompson",
    role: "Head Coach - Texas A&M Baseball",
    avatar: "MT",
    lastMessage: "Great highlight reel! Let's schedule a call to discuss...",
    time: "2m ago",
    unread: 2,
    online: true,
    verified: true,
    type: "coach"
  },
  {
    id: 2,
    name: "Nike Sports Marketing",
    role: "Brand Partnership",
    avatar: "NK",
    lastMessage: "We'd love to discuss an NIL deal opportunity with you.",
    time: "15m ago",
    unread: 1,
    online: true,
    verified: true,
    type: "brand"
  },
  {
    id: 3,
    name: "Jordan Williams",
    role: "QB - University of Alabama",
    avatar: "JW",
    lastMessage: "Thanks for the training tips! Really helped my game.",
    time: "1h ago",
    unread: 0,
    online: false,
    verified: false,
    type: "athlete"
  },
  {
    id: 4,
    name: "SEC Baseball Network",
    role: "Media Partner",
    avatar: "SB",
    lastMessage: "Would you be interested in a feature interview?",
    time: "3h ago",
    unread: 0,
    online: true,
    verified: true,
    type: "media"
  },
  {
    id: 5,
    name: "Diamond Grind Team",
    role: "Group Chat - 12 members",
    avatar: "DG",
    lastMessage: "Marcus: See you all at practice tomorrow!",
    time: "5h ago",
    unread: 5,
    online: false,
    verified: false,
    type: "group"
  },
  {
    id: 6,
    name: "Sarah Chen",
    role: "Basketball - Stanford",
    avatar: "SC",
    lastMessage: "The NIL workshop was amazing! Thanks for organizing.",
    time: "1d ago",
    unread: 0,
    online: false,
    verified: false,
    type: "athlete"
  },
];

const messages = [
  { id: 1, sender: "them", text: "Hi! I saw your highlight reel on ATHLYNX. Very impressive!", time: "10:30 AM", read: true },
  { id: 2, sender: "me", text: "Thank you Coach Thompson! I've been working hard this season.", time: "10:32 AM", read: true },
  { id: 3, sender: "them", text: "Your pitching mechanics have really improved. What's your current velocity?", time: "10:33 AM", read: true },
  { id: 4, sender: "me", text: "I'm consistently hitting 94-96 mph on my fastball, topped out at 97 last game.", time: "10:35 AM", read: true },
  { id: 5, sender: "them", text: "That's excellent! We're looking for pitchers with your profile for our 2026 class.", time: "10:36 AM", read: true },
  { id: 6, sender: "them", text: "Great highlight reel! Let's schedule a call to discuss your future with Texas A&M baseball.", time: "10:38 AM", read: false },
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showMobileChat, setShowMobileChat] = useState(false);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    toast.success("Message sent!");
    setMessageText("");
  };

  const handleSelectConversation = (conv: typeof conversations[0]) => {
    setSelectedConversation(conv);
    setShowMobileChat(true);
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src="/images/dhg-crab-shield-new.jpeg" alt="ATHLYNX" className="w-8 h-8 rounded-full" />
                <span className="text-xl font-black text-white hidden sm:block">NIL MESSENGER</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            {user ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {user.name?.charAt(0) || "U"}
              </div>
            ) : (
              <Link href="/" className="text-cyan-400 text-sm hover:underline">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 bg-slate-900/50 border-r border-white/10 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Search & Filter */}
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { id: "all", label: "All" },
                { id: "coach", label: "Coaches" },
                { id: "brand", label: "Brands" },
                { id: "athlete", label: "Athletes" },
                { id: "group", label: "Groups" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterType === filter.id
                      ? "bg-cyan-500 text-black"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* New Message Button */}
          <div className="px-4 pb-3">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition-colors">
              <Plus className="w-4 h-4" />
              New Message
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  selectedConversation.id === conv.id
                    ? "bg-cyan-500/10 border-l-2 border-cyan-500"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    conv.type === "coach" ? "bg-gradient-to-br from-green-500 to-emerald-700" :
                    conv.type === "brand" ? "bg-gradient-to-br from-orange-500 to-red-600" :
                    conv.type === "group" ? "bg-gradient-to-br from-purple-500 to-pink-600" :
                    conv.type === "media" ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
                    "bg-gradient-to-br from-cyan-500 to-blue-600"
                  }`}>
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold text-sm truncate">{conv.name}</span>
                    {conv.verified && (
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-500 text-xs truncate">{conv.role}</p>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-gray-500 text-xs">{conv.time}</span>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-cyan-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-slate-900/50 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-2 text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    selectedConversation.type === "coach" ? "bg-gradient-to-br from-green-500 to-emerald-700" :
                    selectedConversation.type === "brand" ? "bg-gradient-to-br from-orange-500 to-red-600" :
                    "bg-gradient-to-br from-cyan-500 to-blue-600"
                  }`}>
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-white font-semibold">{selectedConversation.name}</span>
                      {selectedConversation.verified && (
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">
                      {selectedConversation.online ? "Online" : "Last seen recently"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                        msg.sender === "me"
                          ? "bg-cyan-500 text-black rounded-br-sm"
                          : "bg-white/10 text-white rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        msg.sender === "me" ? "text-black/60" : "text-gray-500"
                      }`}>
                        <span className="text-xs">{msg.time}</span>
                        {msg.sender === "me" && (
                          <CheckCheck className={`w-3 h-3 ${msg.read ? "text-black" : "text-black/40"}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-slate-900/50 border-t border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Image className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
