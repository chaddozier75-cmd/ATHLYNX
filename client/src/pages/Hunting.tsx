import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Users, MapPin } from "lucide-react";

export default function Hunting() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-orange-500/10 to-background border-b">
        <div className="container py-12">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Hunting Platform</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Find hunting spots, track harvests, and manage licenses
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">8,456</p>
                    <p className="text-sm text-muted-foreground">Hunting Spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">23,789</p>
                    <p className="text-sm text-muted-foreground">Harvests Logged</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">234</p>
                    <p className="text-sm text-muted-foreground">Competitions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">34,567</p>
                    <p className="text-sm text-muted-foreground">Hunters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Hunting Platform Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          Track your harvests, find spots, and manage your licenses
        </p>
        <Button size="lg">Get Notified</Button>
      </div>
    </div>
  );
}
