import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Fish,
  MapPin,
  Trophy,
  Camera,
  TrendingUp,
  Users,
  Calendar,
  Search,
  Plus,
  Star,
} from "lucide-react";

export default function Fishing() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data from tRPC
  const fishingSpots = [
    {
      id: 1,
      name: "Lake Travis",
      location: "Austin, TX",
      waterType: "freshwater",
      species: ["Largemouth Bass", "Striped Bass", "Catfish"],
      rating: 4.7,
      totalCatches: 1247,
      bestSeason: "Spring",
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      name: "Galveston Bay",
      location: "Galveston, TX",
      waterType: "saltwater",
      species: ["Redfish", "Speckled Trout", "Flounder"],
      rating: 4.8,
      totalCatches: 2134,
      bestSeason: "Fall",
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "Caddo Lake",
      location: "Marshall, TX",
      waterType: "freshwater",
      species: ["Crappie", "Bass", "Catfish"],
      rating: 4.6,
      totalCatches: 856,
      bestSeason: "Year-round",
      image: "/api/placeholder/400/300",
    },
  ];

  const recentCatches = [
    {
      id: 1,
      user: "John Smith",
      species: "Largemouth Bass",
      weight: 8.5,
      length: 24,
      location: "Lake Travis",
      photo: "/api/placeholder/300/300",
      likes: 127,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      species: "Redfish",
      weight: 12.3,
      length: 28,
      location: "Galveston Bay",
      photo: "/api/placeholder/300/300",
      likes: 234,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      user: "Mike Davis",
      species: "Striped Bass",
      weight: 15.7,
      length: 32,
      location: "Lake Travis",
      photo: "/api/placeholder/300/300",
      likes: 456,
      timestamp: "1 day ago",
    },
  ];

  const tournaments = [
    {
      id: 1,
      name: "Texas Bass Masters",
      location: "Lake Travis",
      date: "Feb 15, 2026",
      entryFee: 150,
      prizePool: 10000,
      participants: 47,
      maxParticipants: 50,
      status: "registration_open",
    },
    {
      id: 2,
      name: "Coastal Redfish Challenge",
      location: "Galveston Bay",
      date: "Mar 1, 2026",
      entryFee: 200,
      prizePool: 15000,
      participants: 32,
      maxParticipants: 40,
      status: "registration_open",
    },
  ];

  const leaderboard = [
    { rank: 1, user: "Mike Davis", totalWeight: 127.5, catches: 45, biggestCatch: 15.7 },
    { rank: 2, user: "Sarah Johnson", totalWeight: 115.3, catches: 42, biggestCatch: 14.2 },
    { rank: 3, user: "John Smith", totalWeight: 98.7, catches: 38, biggestCatch: 12.8 },
    { rank: 4, user: "Tom Wilson", totalWeight: 87.2, catches: 35, biggestCatch: 11.5 },
    { rank: 5, user: "Lisa Brown", totalWeight: 76.8, catches: 32, biggestCatch: 10.9 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-500/10 to-background border-b">
        <div className="container py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Fish className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold">Fishing Platform</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Discover fishing spots, track catches, and compete in tournaments
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Log a Catch
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Fishing Spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Fish className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">45,678</p>
                    <p className="text-sm text-muted-foreground">Total Catches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-muted-foreground">Active Tournaments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">23,456</p>
                    <p className="text-sm text-muted-foreground">Anglers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="spots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spots">Fishing Spots</TabsTrigger>
            <TabsTrigger value="catches">Recent Catches</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Fishing Spots Tab */}
          <TabsContent value="spots" className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search fishing spots..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fishingSpots.map((spot) => (
                <Card key={spot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted overflow-hidden rounded-t-lg">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{spot.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {spot.location}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {spot.waterType}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{spot.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({spot.totalCatches} catches)
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Species:</p>
                        <div className="flex flex-wrap gap-1">
                          {spot.species.map((species) => (
                            <Badge key={species} variant="outline" className="text-xs">
                              {species}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Best Season:</span>
                        <span className="font-semibold">{spot.bestSeason}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Catches Tab */}
          <TabsContent value="catches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCatches.map((catch_) => (
                <Card key={catch_.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg relative">
                    <img
                      src={catch_.photo}
                      alt={catch_.species}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">
                      {catch_.weight} lbs
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{catch_.species}</CardTitle>
                    <CardDescription>by {catch_.user}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="font-semibold">{catch_.weight} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Length:</span>
                        <span className="font-semibold">{catch_.length} inches</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold">{catch_.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-muted-foreground">{catch_.timestamp}</span>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Fish className="h-4 w-4" />
                          {catch_.likes}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            {tournaments.map((tournament) => (
              <Card key={tournament.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {tournament.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {tournament.date}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="default">Open for Registration</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="text-2xl font-bold">${tournament.entryFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${tournament.prizePool.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="text-2xl font-bold">
                        {tournament.participants}/{tournament.maxParticipants}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Spots Left</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {tournament.maxParticipants - tournament.participants}
                      </p>
                    </div>
                  </div>
                  <Button size="lg" className="w-full md:w-auto">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Anglers (This Month)</CardTitle>
                <CardDescription>Based on total weight caught</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Rank</th>
                        <th className="text-left p-3">Angler</th>
                        <th className="text-right p-3">Total Weight</th>
                        <th className="text-right p-3">Catches</th>
                        <th className="text-right p-3">Biggest Catch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry) => (
                        <tr key={entry.rank} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {entry.rank <= 3 && (
                                <Trophy
                                  className={`h-5 w-5 ${
                                    entry.rank === 1
                                      ? "text-yellow-500"
                                      : entry.rank === 2
                                      ? "text-gray-400"
                                      : "text-orange-600"
                                  }`}
                                />
                              )}
                              <span className="font-semibold">#{entry.rank}</span>
                            </div>
                          </td>
                          <td className="p-3 font-semibold">{entry.user}</td>
                          <td className="text-right p-3">{entry.totalWeight} lbs</td>
                          <td className="text-right p-3">{entry.catches}</td>
                          <td className="text-right p-3 font-semibold text-primary">
                            {entry.biggestCatch} lbs
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
