import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Zap, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const teamBots = [
    {
      name: "Executive Command Center",
      role: "Chad A. Dozier - CEO & Founder",
      description: "Comprehensive management hub consolidating information from all business units with real-time decision support.",
      icon: "👔",
      capabilities: ["Schedule Management", "Email Filtering", "Strategic Reporting", "Partnership Tracking"]
    },
    {
      name: "Presentation Intelligence Suite",
      role: "Glenn Tse - Presenter & Strategic Partner",
      description: "AI-driven content creation, research support, and audience engagement tools for professional presentations.",
      icon: "🎯",
      capabilities: ["Content Generation", "Research Assistance", "Audience Engagement", "Interactive Presentations"]
    },
    {
      name: "Operations Command Hub",
      role: "Jimmy Boyd - Operations Manager",
      description: "Central nervous system for managing complex multi-faceted operations across the organization.",
      icon: "⚙️",
      capabilities: ["Project Management", "Workflow Automation", "Resource Management", "Risk Monitoring"]
    },
    {
      name: "Marketing Intelligence Engine",
      role: "Andy Kustes - Marketing Director",
      description: "AI-powered tools for campaign management, lead generation, content distribution, and performance analytics.",
      icon: "📊",
      capabilities: ["Lead Generation", "Campaign Management", "Content Creation", "Performance Analytics"]
    },
    {
      name: "Sales Acceleration Platform",
      role: "Lee Marshall - Sales Director",
      description: "AI-powered tools for CRM management, sales outreach, deal tracking, and customer relationship development.",
      icon: "💼",
      capabilities: ["CRM Management", "Sales Outreach", "Deal Tracking", "Customer Intelligence"]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "24/7 Productivity",
      description: "AI bots work around the clock, ensuring continuous progress on critical tasks and immediate response to urgent matters."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Seamless Collaboration",
      description: "Integrated ecosystem where bots share information and coordinate actions across departments for unified operations."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Data-Driven Insights",
      description: "Advanced analytics and reporting capabilities provide actionable intelligence for strategic decision-making."
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Intelligent Automation",
      description: "Eliminate repetitive tasks and streamline workflows, allowing team members to focus on high-value strategic work."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AI Bot Ecosystem</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/bots" className="text-sm font-medium hover:text-primary transition-colors">
              Team Bots
            </Link>
            <Link href="/capabilities" className="text-sm font-medium hover:text-primary transition-colors">
              Capabilities
            </Link>
            <Link href="/implementation" className="text-sm font-medium hover:text-primary transition-colors">
              Implementation
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Transform Your Team with{" "}
            <span className="text-primary">AI-Powered Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive ecosystem of specialized AI assistants designed for Dozier Holdings Group, 
            empowering each team member with intelligent automation and real-time support.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/bots">
                Explore Team Bots <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/implementation">View Implementation Plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Why AI Bot Ecosystem?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed to complement human creativity with AI-powered automation, data processing, and real-time support.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Bots Overview */}
      <section className="container py-16 bg-muted/30 -mx-[50vw] px-[50vw] left-[50%] right-[50%] relative">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Meet Your AI Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five specialized AI assistants, each designed to support a specific team member and role.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {teamBots.map((bot, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{bot.icon}</div>
                <CardTitle className="text-xl">{bot.name}</CardTitle>
                <CardDescription className="font-medium text-foreground/80">{bot.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{bot.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Capabilities:</p>
                  <ul className="space-y-1">
                    {bot.capabilities.map((cap, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/bots">
              View Detailed Bot Profiles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-3xl">Ready to Transform Your Workflow?</CardTitle>
            <CardDescription className="text-lg">
              Discover how the AI Bot Ecosystem can revolutionize productivity and collaboration 
              across Dozier Holdings Group.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/implementation">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/capabilities">Explore Capabilities</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold">AI Bot Ecosystem</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering Dozier Holdings Group with intelligent AI collaboration.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/bots" className="hover:text-primary transition-colors">Team Bots</Link></li>
                <li><Link href="/capabilities" className="hover:text-primary transition-colors">Capabilities</Link></li>
                <li><Link href="/implementation" className="hover:text-primary transition-colors">Implementation</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Dozier Holdings Group<br />
                19039 CLOYANNA LN<br />
                HUMBLE, TX 77346-2746
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
