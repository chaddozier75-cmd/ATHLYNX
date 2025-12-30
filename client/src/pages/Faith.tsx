import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  BookOpen, 
  Mic, 
  Heart, 
  MessageCircle, 
  Users, 
  Play, 
  Pause,
  ChevronRight,
  Quote,
  HandHeart,
  Sparkles,
  Cross,
  Church,
  Star,
  Share2,
  Clock,
  Calendar
} from "lucide-react";

export default function Faith() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("devotional");
  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // API calls
  const { data: todayDevotional } = trpc.fca.getTodayDevotional.useQuery();
  const { data: devotionals } = trpc.fca.getDevotionals.useQuery({ page: 1, limit: 5 });
  const { data: podcasts } = trpc.fca.getPodcasts.useQuery({ page: 1, limit: 5 });
  const { data: blogPosts } = trpc.fca.getBlogPosts.useQuery({ page: 1, limit: 5 });
  const { data: prayerRequests } = trpc.fca.getPrayerRequests.useQuery({ page: 1, limit: 10 });
  const { data: testimonies } = trpc.fca.getTestimonies.useQuery({ page: 1, limit: 5 });
  const { data: todayVerse } = trpc.fca.getTodayVerse.useQuery();
  const { data: stats } = trpc.fca.getStats.useQuery();

  const submitPrayer = trpc.fca.submitPrayerRequest.useMutation();
  const prayFor = trpc.fca.prayForRequest.useMutation();

  const handleSubmitPrayer = async () => {
    if (!prayerTitle || !prayerRequest) return;
    try {
      await submitPrayer.mutateAsync({
        title: prayerTitle,
        request: prayerRequest,
        isAnonymous,
      });
      setPrayerTitle("");
      setPrayerRequest("");
      setIsAnonymous(false);
    } catch (error) {
      console.error("Failed to submit prayer:", error);
    }
  };

  const handlePrayFor = async (id: number) => {
    try {
      await prayFor.mutateAsync({ id });
    } catch (error) {
      console.error("Failed to pray:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900">
      {/* Hero Section - Lakewood Church Inspired */}
      <section className="relative overflow-hidden">
        {/* Background with cross pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container relative py-20 md:py-32">
          {/* Verse of the Day Banner */}
          {todayVerse && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30">
                <Quote className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200 text-sm font-medium">Verse of the Day</span>
              </div>
              <p className="mt-4 text-xl md:text-2xl text-white/90 italic max-w-3xl mx-auto">
                "{todayVerse.verse}"
              </p>
              <p className="mt-2 text-amber-400 font-semibold">{todayVerse.reference}</p>
            </div>
          )}

          {/* Main Hero Content */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Cross className="w-8 h-8 text-amber-400" />
              <Church className="w-10 h-10 text-white" />
              <Cross className="w-8 h-8 text-amber-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Fellowship of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">
                Christian Athletes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-8">
              Where Faith Meets the Field. Daily inspiration, community prayer, and spiritual growth for athletes.
            </p>

            {/* Founder Section */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl font-bold text-white">
                CD
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Chad A. Dozier</p>
                <p className="text-white/60 text-sm">Founder & CEO, ATHLYNX</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">{stats?.devotionals || 0}</p>
                <p className="text-white/60">Devotionals</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">{stats?.prayerRequests || 0}</p>
                <p className="text-white/60">Prayer Requests</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">{stats?.answeredPrayers || 0}</p>
                <p className="text-white/60">Answered Prayers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-amber-400">{stats?.totalPrayers || 0}</p>
                <p className="text-white/60">Prayers Lifted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-1">
            <TabsTrigger value="devotional" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              Devotional
            </TabsTrigger>
            <TabsTrigger value="podcast" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg">
              <Mic className="w-4 h-4 mr-2" />
              Podcast
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="prayer" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg">
              <HandHeart className="w-4 h-4 mr-2" />
              Prayer Wall
            </TabsTrigger>
            <TabsTrigger value="testimonies" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg">
              <Star className="w-4 h-4 mr-2" />
              Testimonies
            </TabsTrigger>
          </TabsList>

          {/* Daily Devotional Tab */}
          <TabsContent value="devotional" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Today's Devotional - Featured */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-amber-500/30 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-500 text-white">Today's Message</Badge>
                      <Calendar className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-3xl text-white">
                      {todayDevotional?.title || "Finding Strength in the Storm"}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      By {todayDevotional?.author || "Chad A. Dozier"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Scripture */}
                    <div className="bg-white/10 rounded-lg p-4 mb-6">
                      <Quote className="w-6 h-6 text-amber-400 mb-2" />
                      <p className="text-white italic text-lg">
                        {todayDevotional?.scripture || "\"I can do all things through Christ who strengthens me.\""}
                      </p>
                      <p className="text-amber-400 mt-2 font-semibold">
                        {todayDevotional?.scriptureReference || "Philippians 4:13"}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="text-white/80 space-y-4">
                      <p>
                        {todayDevotional?.content || 
                          "As athletes, we face challenges that test our limits every day. Whether it's a tough practice, a difficult opponent, or the pressure of competition, we need a source of strength that goes beyond our physical abilities. Today's scripture reminds us that our true power comes from Christ."}
                      </p>
                      <p>
                        When you step onto the field, court, or track today, remember that you're not alone. God is with you in every sprint, every play, every moment. Your faith is your foundation, and through Him, you can accomplish more than you ever imagined.
                      </p>
                    </div>

                    {/* Prayer */}
                    {todayDevotional?.prayer && (
                      <div className="mt-6 bg-white/5 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-2">Today's Prayer:</p>
                        <p className="text-white/80 italic">{todayDevotional.prayer}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 mt-6">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                        <Heart className="w-4 h-4 mr-2" />
                        {todayDevotional?.likes || 0} Likes
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Devotionals */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Previous Devotionals</h3>
                <div className="space-y-4">
                  {devotionals && devotionals.length > 0 ? (
                    devotionals.map((dev) => (
                      <Card key={dev.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <p className="text-white font-semibold">{dev.title}</p>
                          <p className="text-white/60 text-sm mt-1">{dev.scriptureReference}</p>
                          <div className="flex items-center gap-4 mt-2 text-white/40 text-xs">
                            <span>{dev.views} views</span>
                            <span>{dev.likes} likes</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <>
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <p className="text-white font-semibold">Running the Race with Purpose</p>
                          <p className="text-white/60 text-sm mt-1">Hebrews 12:1-2</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <p className="text-white font-semibold">Victory Through Faith</p>
                          <p className="text-white/60 text-sm mt-1">1 John 5:4</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <p className="text-white font-semibold">The Ultimate Teammate</p>
                          <p className="text-white/60 text-sm mt-1">Ecclesiastes 4:9-10</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Podcast Tab */}
          <TabsContent value="podcast" className="mt-8">
            <div className="max-w-4xl mx-auto">
              {/* Featured Podcast */}
              <Card className="bg-gradient-to-br from-purple-500/20 to-amber-500/20 border-purple-500/30 mb-8">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 h-64 bg-gradient-to-br from-amber-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Mic className="w-24 h-24 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-purple-500 text-white mb-4">Latest Episode</Badge>
                      <h2 className="text-3xl font-bold text-white mb-2">Faith & The Field</h2>
                      <p className="text-white/60 mb-4">with Chad A. Dozier</p>
                      <h3 className="text-xl text-white mb-2">
                        {podcasts?.[0]?.title || "Episode 1: The Foundation of Faith in Sports"}
                      </h3>
                      <p className="text-white/70 mb-6">
                        {podcasts?.[0]?.description || "In this premiere episode, Chad shares his personal journey of faith and how it shaped his vision for ATHLYNX. Learn how to integrate your spiritual life with your athletic pursuits."}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button 
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                          {isPlaying ? "Pause" : "Play Episode"}
                        </Button>
                        <span className="text-white/60 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {podcasts?.[0]?.duration ? `${Math.floor(podcasts[0].duration / 60)} min` : "45 min"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Episode List */}
              <h3 className="text-xl font-bold text-white mb-4">All Episodes</h3>
              <div className="space-y-4">
                {podcasts && podcasts.length > 0 ? (
                  podcasts.map((podcast) => (
                    <Card key={podcast.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-purple-600 rounded-lg flex items-center justify-center">
                          <Mic className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">Episode {podcast.episodeNumber}: {podcast.title}</p>
                          <p className="text-white/60 text-sm">{podcast.guest ? `Guest: ${podcast.guest}` : `Host: ${podcast.host}`}</p>
                        </div>
                        <div className="text-white/40 text-sm">
                          {Math.floor(podcast.duration / 60)} min
                        </div>
                        <Button size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300">
                          <Play className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <>
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-purple-600 rounded-lg flex items-center justify-center">
                          <Mic className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">Episode 1: The Foundation of Faith in Sports</p>
                          <p className="text-white/60 text-sm">Host: Chad A. Dozier</p>
                        </div>
                        <div className="text-white/40 text-sm">45 min</div>
                        <Button size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300">
                          <Play className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts && blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <Card key={post.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-amber-500/30 to-purple-500/30 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/50" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2">{post.category || "Faith & Sports"}</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                      <p className="text-white/60 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">{post.author}</span>
                        <Button variant="ghost" className="text-amber-400 hover:text-amber-300">
                          Read More <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-amber-500/30 to-purple-500/30 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/50" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2">Faith & Sports</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">How Faith Transforms Athletic Performance</h3>
                      <p className="text-white/60 text-sm mb-4">Discover how top athletes use their faith as a foundation for excellence...</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Chad A. Dozier</span>
                        <Button variant="ghost" className="text-amber-400 hover:text-amber-300">
                          Read More <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-purple-500/30 to-amber-500/30 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/50" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2">Community</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">Building a Team on Faith</h3>
                      <p className="text-white/60 text-sm mb-4">The power of shared beliefs in creating championship culture...</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Chad A. Dozier</span>
                        <Button variant="ghost" className="text-amber-400 hover:text-amber-300">
                          Read More <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Prayer Wall Tab */}
          <TabsContent value="prayer" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Submit Prayer Form */}
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-amber-500/30 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <HandHeart className="w-5 h-5 text-amber-400" />
                      Submit a Prayer Request
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      Share your prayer needs with our community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Prayer title"
                      value={prayerTitle}
                      onChange={(e) => setPrayerTitle(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Textarea
                      placeholder="Share your prayer request..."
                      value={prayerRequest}
                      onChange={(e) => setPrayerRequest(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-32"
                    />
                    <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-white/20"
                      />
                      Post anonymously
                    </label>
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={handleSubmitPrayer}
                      disabled={!user || submitPrayer.isPending}
                    >
                      {submitPrayer.isPending ? "Submitting..." : "Submit Prayer"}
                    </Button>
                    {!user && (
                      <p className="text-white/50 text-sm text-center">
                        Please sign in to submit a prayer request
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Prayer Wall */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Community Prayer Wall
                </h3>
                <div className="space-y-4">
                  {prayerRequests && prayerRequests.length > 0 ? (
                    prayerRequests.map((prayer) => (
                      <Card key={prayer.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-white font-semibold">{prayer.title}</h4>
                              <p className="text-white/50 text-sm">
                                {prayer.isAnonymous === "yes" ? "Anonymous" : prayer.userName}
                              </p>
                            </div>
                            {prayer.status === "answered" && (
                              <Badge className="bg-green-500 text-white">Answered!</Badge>
                            )}
                          </div>
                          <p className="text-white/70 mb-4">{prayer.request}</p>
                          <div className="flex items-center gap-4">
                            <Button 
                              size="sm" 
                              className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                              onClick={() => handlePrayFor(prayer.id)}
                            >
                              <HandHeart className="w-4 h-4 mr-2" />
                              I Prayed ({prayer.prayerCount})
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white/50 hover:text-white">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Comment
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <>
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-white font-semibold">Strength for Upcoming Season</h4>
                              <p className="text-white/50 text-sm">Anonymous</p>
                            </div>
                          </div>
                          <p className="text-white/70 mb-4">
                            Praying for strength and wisdom as I prepare for the upcoming season. Please pray that I stay healthy and perform to the best of my abilities.
                          </p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
                              <HandHeart className="w-4 h-4 mr-2" />
                              I Prayed (24)
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-white font-semibold">Recovery from Injury</h4>
                              <p className="text-white/50 text-sm">Marcus J.</p>
                            </div>
                            <Badge className="bg-green-500 text-white">Answered!</Badge>
                          </div>
                          <p className="text-white/70 mb-4">
                            Thank you all for your prayers! I'm back on the field and feeling stronger than ever. God is good!
                          </p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
                              <HandHeart className="w-4 h-4 mr-2" />
                              I Prayed (156)
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Testimonies Tab */}
          <TabsContent value="testimonies" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {testimonies && testimonies.length > 0 ? (
                testimonies.map((testimony) => (
                  <Card key={testimony.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                          {testimony.athleteName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{testimony.athleteName}</h4>
                          <p className="text-white/50 text-sm">{testimony.sport} • {testimony.school}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{testimony.title}</h3>
                      <p className="text-white/70 mb-4">{testimony.testimony}</p>
                      {testimony.scripture && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-amber-400 italic text-sm">"{testimony.scripture}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                          J
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Jordan Williams</h4>
                          <p className="text-white/50 text-sm">Football • University of Alabama</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">From Doubt to Championship</h3>
                      <p className="text-white/70 mb-4">
                        When I tore my ACL, I thought my career was over. But through faith and the support of this community, I not only recovered but came back stronger. God had a plan for me all along.
                      </p>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-amber-400 italic text-sm">"For I know the plans I have for you..." - Jeremiah 29:11</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                          S
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Sarah Chen</h4>
                          <p className="text-white/50 text-sm">Basketball • Stanford</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Finding Peace in Pressure</h3>
                      <p className="text-white/70 mb-4">
                        The pressure of D1 basketball was overwhelming until I learned to surrender it to God. Now I play with joy, not fear. My faith is my competitive advantage.
                      </p>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-amber-400 italic text-sm">"Be still and know that I am God." - Psalm 46:10</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Founder's Testimony - Chad A. Dozier */}
            <Card className="bg-gradient-to-br from-red-500/20 via-amber-500/20 to-yellow-500/20 border-2 border-amber-500/50 mt-8 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-400" />
                  <Badge className="bg-amber-500 text-white">Founder's Testimony</Badge>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-3xl font-bold text-white border-4 border-amber-400/50">
                      CD
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">Chad A. Dozier</h3>
                    <p className="text-amber-400 text-sm mb-4">Baseball • Mississippi State University • Founder & CEO, ATHLYNX</p>
                    
                    <h4 className="text-xl font-bold text-white mb-3">"Why I'm Doing This"</h4>
                    
                    <div className="space-y-4 text-white/80">
                      <p>
                        I was a promising baseball player at Mississippi State when a bad injury cut my career short. But the injury wasn't the end of my story—it was what followed that nearly destroyed me.
                      </p>
                      <p>
                        <strong className="text-red-400">Poor choices.</strong> Decisions that followed me for many more years after. The kind of mistakes that happen when a young athlete loses their identity, their purpose, their direction.
                      </p>
                      <p>
                        <strong className="text-amber-400">That's why I'm doing this.</strong> Not for the money. Not for the fame. I'm building ATHLYNX so that one child who had a childhood like mine would never make the same mistakes I made.
                      </p>
                      <p className="text-cyan-400 font-semibold">
                        If my testimony helps that ONE person—just one—then I've done my job.
                      </p>
                      <p>
                        And you know what? I'm having the time of my life. I feel like I'm living my childhood dream through this platform and the apps that go along with it. <strong className="text-yellow-400">I'm honored.</strong>
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4 mt-6">
                      <Quote className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-amber-200 italic">"And we know that in all things God works for the good of those who love him, who have been called according to his purpose."</p>
                      <p className="text-amber-400 mt-2 font-semibold">Romans 8:28</p>
                    </div>
                    
                    <div className="mt-6">
                      <Link href="/founder-story">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                          Read My Full Story <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Submit Testimony CTA */}
            <div className="mt-8 text-center">
              <Card className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-amber-500/30 inline-block">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Share Your Story</h3>
                  <p className="text-white/70 mb-4">Your testimony could inspire another athlete</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                        <Star className="w-4 h-4 mr-2" />
                        Submit Your Testimony
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-white">Share Your Testimony</DialogTitle>
                        <DialogDescription className="text-white/60">
                          Tell us how faith has impacted your athletic journey
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <Input placeholder="Title" className="bg-white/10 border-white/20 text-white" />
                        <Input placeholder="Your Sport" className="bg-white/10 border-white/20 text-white" />
                        <Input placeholder="School (optional)" className="bg-white/10 border-white/20 text-white" />
                        <Textarea placeholder="Share your testimony..." className="bg-white/10 border-white/20 text-white min-h-32" />
                        <Input placeholder="Favorite Scripture (optional)" className="bg-white/10 border-white/20 text-white" />
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                          Submit Testimony
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Faith Community
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to receive daily devotionals, podcast updates, and community prayer requests directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-amber-600 hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
