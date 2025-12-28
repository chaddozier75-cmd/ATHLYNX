import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Target, Users, CheckCircle2, ArrowRight, Star, Zap, BarChart3, School } from "lucide-react";
import { Link } from "wouter";

export default function TransferPortal() {
  const pathwaySteps = [
    {
      step: 1,
      title: "Assess Your Current Position",
      description: "Evaluate your athletic performance, academic standing, and current opportunities",
      actions: [
        "Complete athletic performance assessment",
        "Review academic eligibility requirements",
        "Analyze current playing time and role",
        "Identify areas for improvement"
      ]
    },
    {
      step: 2,
      title: "Get Better",
      description: "Develop your skills and increase your value through targeted improvement",
      actions: [
        "Create personalized training plan",
        "Track performance metrics and progress",
        "Work with coaches and trainers",
        "Build highlight reel of improvements"
      ]
    },
    {
      step: 3,
      title: "Research Better Fits",
      description: "Identify schools that match your improved talent level and career goals",
      actions: [
        "Search schools by division and conference",
        "Analyze roster needs and opportunities",
        "Compare academic programs and facilities",
        "Connect with current athletes at target schools"
      ]
    },
    {
      step: 4,
      title: "Navigate the Portal",
      description: "Execute your transfer strategy with confidence and proper timing",
      actions: [
        "Understand transfer portal windows",
        "Prepare required documentation",
        "Reach out to coaches strategically",
        "Manage multiple opportunities simultaneously"
      ]
    },
    {
      step: 5,
      title: "Maximize NIL Value",
      description: "Leverage your new platform to increase endorsement opportunities",
      actions: [
        "Build media presence at new school",
        "Connect with local and national brands",
        "Negotiate NIL deals effectively",
        "Track and grow your NIL value"
      ]
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Increased Visibility",
      description: "Move to programs with better media coverage and exposure"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Better Fit",
      description: "Find schools that match your playing style and career goals"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "More Playing Time",
      description: "Get on the field/court more and showcase your abilities"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Higher NIL Value",
      description: "Bigger platform = better endorsement opportunities"
    },
    {
      icon: <School className="h-8 w-8" />,
      title: "Academic Advancement",
      description: "Access better academic programs and resources"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Career Acceleration",
      description: "Fast-track your path to professional opportunities"
    }
  ];

  const transferStats = [
    { label: "Average NIL Increase", value: "3.2x", description: "After successful transfer" },
    { label: "Playing Time Increase", value: "65%", description: "More minutes/snaps per game" },
    { label: "Successful Transfers", value: "2,500+", description: "Athletes we've helped" },
    { label: "Better School Fit", value: "87%", description: "Report improved satisfaction" }
  ];

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
            <Link href="/transfer-portal" className="text-sm font-medium text-primary">
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
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            Your Pathway to Success
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Navigate the <span className="text-primary">Transfer Portal</span> with Confidence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're at a smaller school looking to move up or seeking better opportunities, 
            Athlynx guides you through every step. Get better, transfer smarter, and increase your 
            NIL value along the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Talk to Transfer Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {transferStats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transfer Pathway */}
      <section className="container py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold">Your 5-Step Transfer Pathway</h2>
          <p className="text-xl text-muted-foreground">
            A proven process to help you move from where you are to where you want to be
          </p>
        </div>

        <div className="space-y-8">
          {pathwaySteps.map((step, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3 ml-16">
                  {step.actions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <Button size="lg">
            Get Your Personalized Transfer Plan <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">Why Transfer?</h2>
            <p className="text-xl text-muted-foreground">
              The right transfer can transform your athletic career and open doors you never imagined
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">How Athlynx Helps You Transfer</h2>
            <p className="text-lg text-muted-foreground">
              We provide the tools, guidance, and connections you need to navigate the transfer 
              portal successfully and land at the right school for your career.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <strong>Smart School Matching:</strong> Our algorithm matches you with schools that fit your talent level, academic goals, and career aspirations
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <strong>Direct Coach Connections:</strong> Message coaches directly through our platform and track all your conversations in one place
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <strong>Transfer Timeline Management:</strong> Never miss a deadline with our automated reminders and portal window tracking
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full p-1 mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <strong>NIL Value Tracking:</strong> See how your transfer could impact your earning potential before you make the move
                </div>
              </li>
            </ul>
            <Button size="lg">
              Explore Schools Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle>Transfer Portal Windows 2024-2025</CardTitle>
                <CardDescription>Important dates you need to know</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <div className="font-semibold">Fall Window</div>
                    <div className="text-sm text-muted-foreground">Football, Basketball</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">Dec 4-28</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <div className="font-semibold">Winter Window</div>
                    <div className="text-sm text-muted-foreground">All Sports</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">Apr 16-May 1</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <div className="font-semibold">Spring Window</div>
                    <div className="text-sm text-muted-foreground">Spring Sports</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">May 1-15</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Graduate Transfer</div>
                    <div className="text-sm text-muted-foreground">All Sports</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">Year-round</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Talk to a transfer advisor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our team of former athletes and coaches can help you navigate the transfer process, 
                  evaluate opportunities, and make the best decision for your career.
                </p>
                <Button className="w-full">
                  Schedule Free Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Make Your Move?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of athletes who have successfully navigated the transfer portal with Athlynx. 
            Your next opportunity is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Transfer Process <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Browse Schools
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
