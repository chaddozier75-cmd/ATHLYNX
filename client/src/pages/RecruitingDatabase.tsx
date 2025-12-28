import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Search, Filter, Heart, MapPin, School } from "lucide-react";

export default function RecruitingDatabase() {
  const [filters, setFilters] = useState({
    position: "",
    gradYear: "",
    state: "",
    commitmentStatus: "",
  });

  const { data: players, isLoading } = trpc.athleteProfiles.search.useQuery(filters);

  const positions = ["C", "1B", "2B", "3B", "SS", "OF", "LHP", "RHP", "DH", "UTIL"];
  const gradYears = [2025, 2026, 2027, 2028, 2029, 2030];
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      position: "",
      gradYear: "",
      state: "",
      commitmentStatus: "",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Recruiting Database</h1>
        <p className="text-muted-foreground">
          Search and discover top baseball talent from across the country
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={filters.position}
                onValueChange={(value) => handleFilterChange("position", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All positions</SelectItem>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grad Year</Label>
              <Select
                value={filters.gradYear}
                onValueChange={(value) => handleFilterChange("gradYear", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All years</SelectItem>
                  {gradYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={filters.state}
                onValueChange={(value) => handleFilterChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All states" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All states</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Commitment Status</Label>
              <Select
                value={filters.commitmentStatus}
                onValueChange={(value) => handleFilterChange("commitmentStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="uncommitted">Uncommitted</SelectItem>
                  <SelectItem value="committed">Committed</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : players && players.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => {
            const heightFeet = player.height ? Math.floor(player.height / 12) : 0;
            const heightInches = player.height ? player.height % 12 : 0;
            const heightDisplay = player.height ? `${heightFeet}'${heightInches}"` : "N/A";

            return (
              <Link key={player.id} href={`/player/${player.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={player.photoUrl || undefined} />
                        <AvatarFallback>
                          {player.firstName[0]}{player.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg truncate">
                              {player.firstName} {player.lastName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{player.primaryPosition}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {player.gradYear}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                          {player.city && player.state && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{player.city}, {player.state}</span>
                            </div>
                          )}
                          {player.highSchool && (
                            <div className="flex items-center gap-1">
                              <School className="h-3 w-3" />
                              <span>{player.highSchool}</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                          <div>
                            <p className="text-xs text-muted-foreground">Height</p>
                            <p className="font-semibold">{heightDisplay}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Weight</p>
                            <p className="font-semibold">{player.weight || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">B/T</p>
                            <p className="font-semibold">{player.bats}/{player.throws}</p>
                          </div>
                        </div>

                        {player.commitmentStatus && player.commitmentStatus !== "uncommitted" && (
                          <div className="mt-3">
                            <Badge variant="default" className="text-xs">
                              {player.commitmentStatus}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No players found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
