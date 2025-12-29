import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [email, setEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"pro" | "elite" | "enterprise" | null>(null);
  const [selectedPack, setSelectedPack] = useState<"pack100" | "pack500" | "pack1000" | "pack5000" | null>(null);

  const subscriptionMutation = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to checkout...");
      window.open(data.url, "_blank");
      setShowEmailModal(false);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
    },
  });

  const creditsMutation = trpc.stripe.createCreditsCheckout.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to checkout...");
      window.open(data.url, "_blank");
      setShowEmailModal(false);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create checkout session");
    },
  });

  const handleSubscribe = (tier: "pro" | "elite" | "enterprise") => {
    setSelectedTier(tier);
    setSelectedPack(null);
    setShowEmailModal(true);
  };

  const handleBuyCredits = (pack: "pack100" | "pack500" | "pack1000" | "pack5000") => {
    setSelectedPack(pack);
    setSelectedTier(null);
    setShowEmailModal(true);
  };

  const handleCheckout = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (selectedTier) {
      subscriptionMutation.mutate({
        tier: selectedTier,
        billingPeriod: billingCycle,
        email,
      });
    } else if (selectedPack) {
      creditsMutation.mutate({
        pack: selectedPack,
        email,
      });
    }
  };

  const tiers = [
    {
      id: "free" as const,
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Get started with basic features",
      features: [
        "Basic athlete profile",
        "View NIL opportunities",
        "5 AI credits/month",
        "Community access",
        "Basic stats tracking",
      ],
      cta: "Start Free",
      popular: false,
      color: "from-gray-600 to-gray-700",
    },
    {
      id: "pro" as const,
      name: "Pro",
      price: { monthly: 9.99, annual: 99 },
      description: "For serious athletes",
      features: [
        "Everything in Free",
        "Advanced profile customization",
        "50 AI credits/month",
        "Video highlight reels",
        "Recruiting email templates",
        "Priority support",
        "Training plans",
      ],
      cta: "Go Pro",
      popular: false,
      color: "from-blue-600 to-blue-700",
    },
    {
      id: "elite" as const,
      name: "Elite",
      price: { monthly: 29.99, annual: 299 },
      description: "Maximum exposure & tools",
      features: [
        "Everything in Pro",
        "200 AI credits/month",
        "Personal AI coach bot",
        "Auto highlight generation",
        "Scout network access",
        "NIL deal matching",
        "Unlimited messaging",
        "Analytics dashboard",
        "College coach contacts",
      ],
      cta: "Go Elite",
      popular: true,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "enterprise" as const,
      name: "Enterprise",
      price: { monthly: 99.99, annual: 999 },
      description: "For teams & organizations",
      features: [
        "Everything in Elite",
        "Unlimited AI credits",
        "Team management",
        "White-label options",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Bulk athlete onboarding",
        "Advanced analytics",
        "Priority feature requests",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-600 to-purple-700",
    },
  ];

  const creditPacks = [
    { id: "pack100" as const, credits: 100, price: 9.99, bonus: 0 },
    { id: "pack500" as const, credits: 500, price: 39.99, bonus: 50 },
    { id: "pack1000" as const, credits: 1000, price: 69.99, bonus: 150 },
    { id: "pack5000" as const, credits: 5000, price: 299.99, bonus: 1000 },
  ];

  const isLoading = subscriptionMutation.isPending || creditsMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedTier ? `Subscribe to ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}` : "Buy AI Credits"}
            </h3>
            <p className="text-gray-400 mb-6">
              Enter your email to continue to secure checkout
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Continue to Checkout"}
              </button>
            </div>
            <p className="text-gray-500 text-xs text-center mt-4">
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-gray-400 hover:text-white">Store</Link>
            <Link href="/pricing" className="text-yellow-400 font-semibold">Pricing</Link>
            <Link href="/ai-credits" className="text-gray-400 hover:text-white">AI Credits</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              💳 PRICING
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Choose Your <span className="text-yellow-400">Plan</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlock your full potential with ATHLYNX. From free basics to enterprise solutions.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/10 p-1 rounded-xl flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === "annual"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Annual <span className="text-green-400 ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border ${
                  tier.popular ? "border-yellow-500" : "border-white/10"
                } p-6 flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <span className="text-white text-xl">
                    {tier.name === "Free" && "🆓"}
                    {tier.name === "Pro" && "⚡"}
                    {tier.name === "Elite" && "👑"}
                    {tier.name === "Enterprise" && "🏢"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">
                    ${billingCycle === "monthly" ? tier.price.monthly : tier.price.annual}
                  </span>
                  <span className="text-gray-500">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (tier.id === "free") {
                      toast.success("Free tier - no payment required! Sign up to get started.");
                    } else {
                      handleSubscribe(tier.id as "pro" | "elite" | "enterprise");
                    }
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    tier.popular
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:opacity-90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* AI Credits Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                🤖 AI CREDITS
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Need More <span className="text-cyan-400">AI Power</span>?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Purchase additional AI credits to power your personal AI coach, generate highlights, write recruiting emails, and more.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {creditPacks.map((pack) => (
                <div
                  key={pack.credits}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center hover:border-cyan-500/50 transition-all"
                >
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {pack.credits.toLocaleString()}
                  </p>
                  <p className="text-cyan-400 text-sm mb-3">credits</p>
                  {pack.bonus > 0 && (
                    <p className="text-green-400 text-xs mb-2">+{pack.bonus} bonus!</p>
                  )}
                  <p className="text-xl font-bold text-white mb-3">${pack.price}</p>
                  <button
                    onClick={() => handleBuyCredits(pack.id)}
                    className="w-full py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-cyan-500/30 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* What AI Credits Do */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              What Can You Do With AI Credits?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🎥", title: "Auto Highlights", desc: "Generate highlight reels from game footage", credits: "10 credits" },
                { icon: "✉️", title: "Recruiting Emails", desc: "AI writes personalized emails to coaches", credits: "5 credits" },
                { icon: "📊", title: "Performance Analysis", desc: "Deep dive into your stats and trends", credits: "15 credits" },
                { icon: "💪", title: "Training Plans", desc: "Custom workout plans for your goals", credits: "20 credits" },
                { icon: "🎯", title: "Scout Matching", desc: "Find scouts interested in your profile", credits: "25 credits" },
                { icon: "📱", title: "Social Content", desc: "Generate posts for your social media", credits: "5 credits" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                    <p className="text-cyan-400 text-xs mt-1">{item.credits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Card Info */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-10 text-center">
            <p className="text-green-400 font-semibold mb-2">🧪 Test Mode Active</p>
            <p className="text-gray-400 text-sm">
              Use test card: <span className="text-white font-mono">4242 4242 4242 4242</span> with any future date and CVC
            </p>
          </div>

          {/* FAQ */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Questions?</h3>
            <p className="text-gray-400 mb-4">
              Contact us at <span className="text-yellow-400">support@athlynx.ai</span>
            </p>
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
