import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Trophy, Users, Target } from "lucide-react";

export default function Golf() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-green-500/10 to-background border-b">
        <div className="container py-12">
          <div className="flex items-center gap-3 mb-2">
            <Flag className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Golf Platform</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Find courses, track your game, and compete in tournaments
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Flag className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">40,127</p>
                    <p className="text-sm text-muted-foreground">Golf Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">234,567</p>
                    <p className="text-sm text-muted-foreground">Rounds Played</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">456</p>
                    <p className="text-sm text-muted-foreground">Tournaments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">67,890</p>
                    <p className="text-sm text-muted-foreground">Golfers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Golf Platform Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          Track your rounds, find courses, and compete in tournaments
        </p>
        <Button size="lg">Get Notified</Button>
      </div>
    </div>
  );
}
