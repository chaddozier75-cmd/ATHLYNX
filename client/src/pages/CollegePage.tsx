import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, Users, GraduationCap, DollarSign, Heart, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function CollegePage() {
  const params = useParams<{ id: string }>();
  const collegeId = parseInt(params.id || "0");

  const { data: college, isLoading } = trpc.colleges.getById.useQuery({ id: collegeId });
  const { data: commitments } = trpc.colleges.getCommitments.useQuery({ collegeId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">College not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-8">
      {/* Header Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                {college.logoUrl ? (
                  <img src={college.logoUrl} alt={college.name} className="h-full w-full object-cover rounded-full" />
                ) : (
                  <GraduationCap className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {college.division}
                  </Badge>
                  <h1 className="text-3xl font-bold">{college.name}</h1>
                  <p className="text-lg text-muted-foreground mt-1">{college.conference}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    {college.city && college.state && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {college.city}, {college.state}
                      </div>
                    )}
                    {college.enrollment && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {college.enrollment.toLocaleString()} students
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
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Tuition (In-State)</p>
                  <p className="text-lg font-semibold">
                    ${college.tuitionInState?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tuition (Out-of-State)</p>
                  <p className="text-lg font-semibold">
                    ${college.tuitionOutOfState?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stadium</p>
                  <p className="text-lg font-semibold">{college.stadium || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commitments</p>
                  <p className="text-lg font-semibold">{commitments?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="commitments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="commitments">Commitments</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        {/* Commitments Tab */}
        <TabsContent value="commitments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>2026 Commitments</CardTitle>
            </CardHeader>
            <CardContent>
              {commitments && commitments.length > 0 ? (
                <div className="space-y-4">
                  {commitments.map((athlete) => {
                    const heightFeet = athlete.height ? Math.floor(athlete.height / 12) : 0;
                    const heightInches = athlete.height ? athlete.height % 12 : 0;
                    const heightDisplay = athlete.height ? `${heightFeet}'${heightInches}"` : "N/A";

                    return (
                      <Link key={athlete.id} href={`/player/${athlete.id}`}>
                        <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={athlete.photoUrl || undefined} />
                            <AvatarFallback>
                              {athlete.firstName[0]}{athlete.lastName[0]}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {athlete.firstName} {athlete.lastName}
                              </h3>
                              <Badge variant="secondary">{athlete.primaryPosition}</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              {athlete.city && athlete.state && (
                                <span>{athlete.city}, {athlete.state}</span>
                              )}
                              {athlete.highSchool && (
                                <span>• {athlete.highSchool}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-6 text-sm">
                            <div className="text-center">
                              <p className="text-muted-foreground">Height</p>
                              <p className="font-semibold">{heightDisplay}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground">Weight</p>
                              <p className="font-semibold">{athlete.weight || "N/A"}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground">B/T</p>
                              <p className="font-semibold">{athlete.bats}/{athlete.throws}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground">Class</p>
                              <p className="font-semibold">{athlete.gradYear}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No commitments yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roster Tab */}
        <TabsContent value="roster">
          <Card>
            <CardHeader>
              <CardTitle>Current Roster</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">Roster information coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coaches Tab */}
        <TabsContent value="coaches">
          <Card>
            <CardHeader>
              <CardTitle>Coaching Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {college.headCoach && (
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Head Coach</p>
                    <p className="text-lg font-semibold">{college.headCoach}</p>
                    {college.coachEmail && (
                      <p className="text-sm text-muted-foreground mt-1">{college.coachEmail}</p>
                    )}
                    {college.coachPhone && (
                      <p className="text-sm text-muted-foreground">{college.coachPhone}</p>
                    )}
                  </div>
                )}

                {!college.headCoach && (
                  <p className="text-center text-muted-foreground py-8">Coach information not available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Info Tab */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  {college.website ? (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {college.website}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Division</p>
                  <p className="font-semibold">{college.division}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conference</p>
                  <p className="font-semibold">{college.conference || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment</p>
                  <p className="font-semibold">
                    {college.enrollment?.toLocaleString() || "N/A"} students
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">
                    {college.city && college.state ? `${college.city}, ${college.state}` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stadium</p>
                  <p className="font-semibold">{college.stadium || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
