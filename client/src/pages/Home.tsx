import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, TrendingUp, MessageCircle, Calendar, DollarSign, ArrowRight, Star, Target, Zap, Heart, Shield, Music } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const features = [
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "The Athlete Playbook",
      description: "Boost your recruiting presence and media profile with our comprehensive tools designed to elevate your athletic career."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Transfer Portal",
      description: "Navigate your path from smaller schools to top programs. Get better, transfer up, and increase your NIL value."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "NIL Opportunities",
      description: "Discover and manage endorsement deals. Connect with brands looking for athletes like you."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "Athlete Network",
      description: "Connect with athletes globally. Share schedules, compare recruiting efforts, and build your network."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Events & Camps",
      description: "Track camps, showcases, and recruiting events. Never miss an opportunity to be seen."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Professional Connections",
      description: "Connect with coaches, scouts, and recruiters. Build relationships that advance your career."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Orthopedic & Medical Services",
      description: "Access top orthopedic specialists and sports medicine professionals. Keep your body in peak condition with expert care."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Veterans Support",
      description: "Special programs and resources for veteran athletes. Transition support, benefits navigation, and community connections."
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Music Industry Connections",
      description: "Bridge your athletic brand with music opportunities. Connect with artists, producers, and entertainment industry professionals."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Athletes" },
    { number: "$5M+", label: "NIL Deals Facilitated" },
    { number: "500+", label: "Partner Schools" },
    { number: "24/7", label: "Platform Access" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/dhg-crab-logo.png" alt="DHG" className="h-10 w-10" />
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
            <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">
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
      <section className="container py-24 md:py-32 space-y-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            The All-in-One Platform for Student Athletes
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Your Athletic Career,{" "}
            <span className="text-primary">Amplified</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From recruiting to NIL deals, from training to transfers - Athlynx is your complete platform 
            for managing and advancing your athletic career. Connect, compete, and capitalize on your talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="text-lg px-8">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground">
            Athlynx brings together all the tools, connections, and opportunities you need 
            in one powerful platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Warriors Playbook CTA */}
      <section className="container py-24">
        <Card className="border-2 border-primary bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center mb-4">
              <img src="/warriors-playbook-logo.png" alt="Warriors Playbook" className="h-24 w-24 object-contain" />
            </div>
            <CardTitle className="text-4xl">The Warriors Playbook</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              Elite strategies for champions. Your complete guide to dominating on and off the field. 
              Learn the mindset, tactics, and connections that separate good athletes from great warriors.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
            <Button size="lg" asChild>
              <Link href="/warriors-playbook">
                Enter the Warriors Path <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Download Warrior Guide
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* The Athlete Playbook CTA */}
      <section className="container py-24">
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mx-auto">
              <Target className="h-4 w-4" />
              Featured Resource
            </div>
            <CardTitle className="text-4xl">The Athlete Playbook</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              Your complete guide to maximizing recruiting visibility, building your media presence, 
              and connecting with athletes worldwide. Learn the strategies that top recruits use to stand out.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
            <Button size="lg" asChild>
              <Link href="/playbook">
                Explore the Playbook <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Download PDF Guide
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Transfer Portal Section */}
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                Level Up Your Career
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Navigate the Transfer Portal with Confidence</h2>
              <p className="text-lg text-muted-foreground">
                Whether you're at a smaller school looking to move up or exploring better opportunities, 
                Athlynx guides you through every step of the transfer process. Get better, transfer smarter, 
                and increase your NIL value along the way.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>Track Your Progress:</strong> Monitor your athletic development and academic standing
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>Find Better Fits:</strong> Discover schools that match your talent and ambitions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <strong>Maximize NIL Value:</strong> Higher visibility = better endorsement opportunities
                  </div>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/transfer-portal">
                  Explore Transfer Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Card className="border-2">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3.2x</div>
                      <div className="text-sm text-muted-foreground">Avg. NIL Value Increase</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2,500+</div>
                      <div className="text-sm text-muted-foreground">Successful Transfers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Find Better Fit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Take Control of Your Athletic Future?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of athletes who are already using Athlynx to manage their careers, 
            connect with opportunities, and maximize their potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Schedule Demo
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
              <p className="text-xs text-muted-foreground">
                nilportals.com | nilportal.ai
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/playbook" className="hover:text-primary transition-colors">Athlete Playbook</Link></li>
                <li><Link href="/transfer-portal" className="hover:text-primary transition-colors">Transfer Portal</Link></li>
                <li><Link href="/nil-marketplace" className="hover:text-primary transition-colors">NIL Marketplace</Link></li>
                <li><Link href="/messages" className="hover:text-primary transition-colors">Messages</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/team" className="hover:text-primary transition-colors">Our Team</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Dozier Holdings Group<br />
                19039 CLOYANNA LN<br />
                HUMBLE, TX 77346-2746
              </p>
              <p className="text-sm text-muted-foreground">
                cdozier@dozierholdingsgroup.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dozier Holdings Group. All rights reserved. | Founded by Chad A. Dozier & Glenn Tse</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
