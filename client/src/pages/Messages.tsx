import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, MessageCircle, Users, Send, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Messages() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Athlynx</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/playbook" className="text-sm font-medium hover:text-primary transition-colors">
              Athlete Playbook
            </Link>
            <Link href="/transfer-portal" className="text-sm font-medium hover:text-primary transition-colors">
              Transfer Portal
            </Link>
            <Link href="/nil-marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              NIL Marketplace
            </Link>
            <Link href="/messages" className="text-sm font-medium text-primary">
              Messages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm">Sign Up Free</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <MessageCircle className="h-4 w-4" />
            Connect & Communicate
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Athlete <span className="text-primary">Messenger</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with athletes worldwide, message coaches and recruiters, and build your network. 
            All your conversations in one place, seamlessly integrated with the Athlynx platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg">
              Start Messaging <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Find Athletes
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2">
            <CardHeader>
              <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Direct Messaging</CardTitle>
              <CardDescription className="text-base">
                Message athletes, coaches, and recruiters directly. Build relationships that matter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• One-on-one conversations</li>
                <li>• Real-time notifications</li>
                <li>• Share media and highlights</li>
                <li>• Message history and search</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Group Chats</CardTitle>
              <CardDescription className="text-base">
                Create and join group conversations with teammates, training partners, or sport communities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Team group chats</li>
                <li>• Sport-specific communities</li>
                <li>• Training group coordination</li>
                <li>• Event planning and scheduling</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                <Send className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Coach Connect</CardTitle>
              <CardDescription className="text-base">
                Reach out to college coaches and recruiters with confidence. Track your outreach efforts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Verified coach profiles</li>
                <li>• Message templates</li>
                <li>• Follow-up reminders</li>
                <li>• Response tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Seamlessly Integrated</h2>
              <p className="text-lg text-muted-foreground">
                The Athlynx Messenger isn't just another messaging app - it's deeply integrated 
                with every part of the platform. Message directly from NIL opportunities, transfer 
                portal listings, and athlete profiles.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>NIL Deal Discussions:</strong> Message brands directly from deal listings to ask questions and negotiate terms
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>Transfer Portal Connections:</strong> Connect with coaches at target schools without leaving the platform
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>Athlete Network:</strong> Message athletes you discover through the playbook and community features
                  </div>
                </li>
              </ul>
              <Button size="lg">
                Try Messenger Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>All-in-One Platform Experience</CardTitle>
                  <CardDescription>
                    Everything you need in one place - no switching between apps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <Search className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">Find Athletes</div>
                      <div className="text-sm text-muted-foreground">Search and connect globally</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">Start Conversations</div>
                      <div className="text-sm text-muted-foreground">Message instantly</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">Build Network</div>
                      <div className="text-sm text-muted-foreground">Grow your connections</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Start Building Your Network Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join Athlynx and connect with thousands of athletes, coaches, and opportunities. 
            Your network is your net worth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Athlynx</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for student athletes to manage their careers and maximize their potential.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/playbook" className="hover:text-primary transition-colors">Athlete Playbook</Link></li>
                <li><Link href="/transfer-portal" className="hover:text-primary transition-colors">Transfer Portal</Link></li>
                <li><Link href="/nil-marketplace" className="hover:text-primary transition-colors">NIL Marketplace</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/team" className="hover:text-primary transition-colors">Our Team</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">
                cdozier@dozierholdingsgroup.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dozier Holdings Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
