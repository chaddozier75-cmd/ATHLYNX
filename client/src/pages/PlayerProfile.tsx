import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MapPin, School, Calendar, Heart, MessageCircle, Share2 } from "lucide-react";

export default function PlayerProfile() {
  const params = useParams<{ id: string }>();
  const profileId = parseInt(params.id || "0");

  const { data: profile, isLoading } = trpc.athleteProfiles.getById.useQuery({ id: profileId });
  const { data: hittingStats } = trpc.baseballStats.getHittingStats.useQuery({ athleteProfileId: profileId });
  const { data: pitchingStats } = trpc.baseballStats.getPitchingStats.useQuery({ athleteProfileId: profileId });
  const { data: fieldingStats } = trpc.baseballStats.getFieldingStats.useQuery({ athleteProfileId: profileId });
  const { data: videos } = trpc.videos.getByAthleteId.useQuery({ athleteProfileId: profileId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Profile not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const heightFeet = profile.height ? Math.floor(profile.height / 12) : 0;
  const heightInches = profile.height ? profile.height % 12 : 0;
  const heightDisplay = profile.height ? `${heightFeet}'${heightInches}"` : "N/A";

  return (
    <div className="container max-w-6xl py-8">
      {/* Header Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.photoUrl || undefined} />
              <AvatarFallback className="text-3xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Badge variant="secondary">{profile.primaryPosition}</Badge>
                    {profile.secondaryPosition && (
                      <Badge variant="outline">{profile.secondaryPosition}</Badge>
                    )}
                    <span>•</span>
                    <span>Class of {profile.gradYear}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    {profile.city && profile.state && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile.city}, {profile.state}
                      </div>
                    )}
                    {profile.highSchool && (
                      <div className="flex items-center gap-1">
                        <School className="h-4 w-4" />
                        {profile.highSchool}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="text-lg font-semibold">{heightDisplay}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-lg font-semibold">{profile.weight || "N/A"} lbs</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bats/Throws</p>
                  <p className="text-lg font-semibold">{profile.bats || "N/A"}/{profile.throws || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commitment</p>
                  <p className="text-lg font-semibold">
                    <Badge variant={profile.commitmentStatus === "committed" ? "default" : "secondary"}>
                      {profile.commitmentStatus || "Uncommitted"}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
        </TabsList>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          {/* Hitting Stats */}
          {hittingStats && hittingStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Hitting Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Season</th>
                        <th className="text-right p-2">GP</th>
                        <th className="text-right p-2">AB</th>
                        <th className="text-right p-2">H</th>
                        <th className="text-right p-2">2B</th>
                        <th className="text-right p-2">3B</th>
                        <th className="text-right p-2">HR</th>
                        <th className="text-right p-2">RBI</th>
                        <th className="text-right p-2">AVG</th>
                        <th className="text-right p-2">OBP</th>
                        <th className="text-right p-2">SLG</th>
                        <th className="text-right p-2">OPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hittingStats.map((stats) => (
                        <tr key={stats.id} className="border-b">
                          <td className="p-2">{stats.season}</td>
                          <td className="text-right p-2">{stats.gamesPlayed || "-"}</td>
                          <td className="text-right p-2">{stats.atBats || "-"}</td>
                          <td className="text-right p-2">{stats.hits || "-"}</td>
                          <td className="text-right p-2">{stats.doubles || "-"}</td>
                          <td className="text-right p-2">{stats.triples || "-"}</td>
                          <td className="text-right p-2">{stats.homeRuns || "-"}</td>
                          <td className="text-right p-2">{stats.rbi || "-"}</td>
                          <td className="text-right p-2">{stats.battingAverage?.toFixed(3) || "-"}</td>
                          <td className="text-right p-2">{stats.onBasePercentage?.toFixed(3) || "-"}</td>
                          <td className="text-right p-2">{stats.sluggingPercentage?.toFixed(3) || "-"}</td>
                          <td className="text-right p-2">{stats.ops?.toFixed(3) || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pitching Stats */}
          {pitchingStats && pitchingStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pitching Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Season</th>
                        <th className="text-right p-2">GP</th>
                        <th className="text-right p-2">GS</th>
                        <th className="text-right p-2">W</th>
                        <th className="text-right p-2">L</th>
                        <th className="text-right p-2">SV</th>
                        <th className="text-right p-2">IP</th>
                        <th className="text-right p-2">H</th>
                        <th className="text-right p-2">ER</th>
                        <th className="text-right p-2">BB</th>
                        <th className="text-right p-2">K</th>
                        <th className="text-right p-2">ERA</th>
                        <th className="text-right p-2">WHIP</th>
                        <th className="text-right p-2">FB Velo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pitchingStats.map((stats) => (
                        <tr key={stats.id} className="border-b">
                          <td className="p-2">{stats.season}</td>
                          <td className="text-right p-2">{stats.gamesPlayed || "-"}</td>
                          <td className="text-right p-2">{stats.gamesStarted || "-"}</td>
                          <td className="text-right p-2">{stats.wins || "-"}</td>
                          <td className="text-right p-2">{stats.losses || "-"}</td>
                          <td className="text-right p-2">{stats.saves || "-"}</td>
                          <td className="text-right p-2">{stats.inningsPitched || "-"}</td>
                          <td className="text-right p-2">{stats.hits || "-"}</td>
                          <td className="text-right p-2">{stats.earnedRuns || "-"}</td>
                          <td className="text-right p-2">{stats.walks || "-"}</td>
                          <td className="text-right p-2">{stats.strikeouts || "-"}</td>
                          <td className="text-right p-2">{stats.era?.toFixed(2) || "-"}</td>
                          <td className="text-right p-2">{stats.whip?.toFixed(2) || "-"}</td>
                          <td className="text-right p-2">{stats.fastballVelocity || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fielding Stats */}
          {fieldingStats && fieldingStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Fielding Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Season</th>
                        <th className="text-left p-2">Position</th>
                        <th className="text-right p-2">GP</th>
                        <th className="text-right p-2">INN</th>
                        <th className="text-right p-2">PO</th>
                        <th className="text-right p-2">A</th>
                        <th className="text-right p-2">E</th>
                        <th className="text-right p-2">FLD%</th>
                        <th className="text-right p-2">Throw Velo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fieldingStats.map((stats) => (
                        <tr key={stats.id} className="border-b">
                          <td className="p-2">{stats.season}</td>
                          <td className="p-2">{stats.position}</td>
                          <td className="text-right p-2">{stats.gamesPlayed || "-"}</td>
                          <td className="text-right p-2">{stats.innings || "-"}</td>
                          <td className="text-right p-2">{stats.putouts || "-"}</td>
                          <td className="text-right p-2">{stats.assists || "-"}</td>
                          <td className="text-right p-2">{stats.errors || "-"}</td>
                          <td className="text-right p-2">{stats.fieldingPercentage?.toFixed(3) || "-"}</td>
                          <td className="text-right p-2">{stats.throwingVelocity || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {!hittingStats?.length && !pitchingStats?.length && !fieldingStats?.length && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No stats available yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
            </CardHeader>
            <CardContent>
              {videos && videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <div key={video.id} className="space-y-2">
                      <div className="aspect-video bg-muted rounded-lg"></div>
                      <h4 className="font-semibold">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No videos available yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academics Tab */}
        <TabsContent value="academics">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="text-2xl font-semibold">{profile.gpa?.toFixed(2) || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SAT Score</p>
                  <p className="text-2xl font-semibold">{profile.satScore || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ACT Score</p>
                  <p className="text-2xl font-semibold">{profile.actScore || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recruiting Tab */}
        <TabsContent value="recruiting">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Commitment Status</p>
                  <Badge className="mt-1" variant={profile.commitmentStatus === "committed" ? "default" : "secondary"}>
                    {profile.commitmentStatus || "Uncommitted"}
                  </Badge>
                </div>
                {profile.committedCollegeId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Committed To</p>
                    <p className="text-lg font-semibold mt-1">College Name</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
