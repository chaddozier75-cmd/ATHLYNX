import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AthleteDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const athleteData = {
    name: 'Marcus Johnson',
    sport: 'Football',
    position: 'Wide Receiver',
    school: 'University of Texas',
    followers: 45200,
    nilValue: 125000,
    monthlyEarnings: 8500,
    activeDeals: 4,
    pendingDeals: 2,
    completedDeals: 12,
    performanceScore: 87,
    complianceStatus: 'Verified'
  };

  const recentDeals = [
    { id: 1, brand: 'Nike', type: 'Sponsorship', value: 25000, status: 'Active', duration: '12 months' },
    { id: 2, brand: 'Gatorade', type: 'Social Post', value: 5000, status: 'Active', duration: '6 months' },
    { id: 3, brand: 'Local Auto Dealer', type: 'Appearance', value: 2500, status: 'Pending', duration: 'One-time' },
    { id: 4, brand: 'Sports Nutrition Co', type: 'Ambassador', value: 15000, status: 'Active', duration: '12 months' },
  ];

  const fuelBotRecommendations = [
    { id: 1, type: 'Training', title: 'Speed Enhancement Program', description: 'Based on your 40-yard dash times, FUEL Bot recommends interval sprints 3x weekly to improve acceleration.', priority: 'High', icon: 'lightning' },
    { id: 2, type: 'Recovery', title: 'Sleep Optimization', description: 'Your recovery metrics suggest increasing sleep by 45 minutes. Target 8.5 hours for optimal performance.', priority: 'Medium', icon: 'moon' },
    { id: 3, type: 'Nutrition', title: 'Pre-Game Fuel Strategy', description: 'Increase carb intake by 20% on game days. Recommended: 3-4 hours before kickoff.', priority: 'High', icon: 'apple' },
    { id: 4, type: 'Mental', title: 'Visualization Practice', description: '10-minute daily visualization of route running can improve on-field decision making by 15%.', priority: 'Medium', icon: 'brain' },
  ];

  const performanceMetrics = [
    { label: '40-Yard Dash', value: '4.42s', change: '-0.03s', trend: 'up' },
    { label: 'Vertical Jump', value: '38"', change: '+1"', trend: 'up' },
    { label: 'Bench Press', value: '225 x 18', change: '+2 reps', trend: 'up' },
    { label: 'Route Running', value: '92/100', change: '+3', trend: 'up' },
  ];

  const earningsHistory = [
    { month: 'Dec 2024', amount: 8500 },
    { month: 'Nov 2024', amount: 12000 },
    { month: 'Oct 2024', amount: 6500 },
    { month: 'Sep 2024', amount: 9200 },
    { month: 'Aug 2024', amount: 4800 },
    { month: 'Jul 2024', amount: 7300 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/"><img src="/images/crab-shield.png" alt="ATHLYNX" className="h-10 w-10 cursor-pointer" /></Link>
              <div>
                <h1 className="text-xl font-bold text-cyan-400">ATHLETE DASHBOARD</h1>
                <p className="text-sm text-gray-400">Powered by ATHLYNX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">{athleteData.complianceStatus}</span>
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl font-bold">MJ</div>
              <div>
                <h2 className="text-2xl font-bold">{athleteData.name}</h2>
                <p className="text-gray-400">{athleteData.position} | {athleteData.sport}</p>
                <p className="text-cyan-400">{athleteData.school}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-green-400">${athleteData.nilValue.toLocaleString()}</p>
                <p className="text-xs text-gray-400">NIL Value</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-cyan-400">{athleteData.activeDeals}</p>
                <p className="text-xs text-gray-400">Active Deals</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-yellow-400">{athleteData.followers.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Followers</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-purple-400">{athleteData.performanceScore}</p>
                <p className="text-xs text-gray-400">Performance</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="deals" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">NIL Deals</TabsTrigger>
            <TabsTrigger value="fuelbot" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">FUEL Bot AI</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Performance</TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2"><CardTitle className="text-gray-400 text-sm font-medium">Monthly Earnings</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">${athleteData.monthlyEarnings.toLocaleString()}</p>
                  <p className="text-sm text-green-400/70 mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2"><CardTitle className="text-gray-400 text-sm font-medium">Deal Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div><p className="text-3xl font-bold text-cyan-400">{athleteData.activeDeals}</p><p className="text-xs text-gray-400">Active</p></div>
                    <div><p className="text-3xl font-bold text-yellow-400">{athleteData.pendingDeals}</p><p className="text-xs text-gray-400">Pending</p></div>
                    <div><p className="text-3xl font-bold text-gray-500">{athleteData.completedDeals}</p><p className="text-xs text-gray-400">Completed</p></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                <CardHeader className="pb-2"><CardTitle className="text-orange-400 text-sm font-medium">FUEL Bot Insight</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-white font-medium">Speed Training Alert</p>
                  <p className="text-sm text-gray-300 mt-1">Your 40-time can improve 0.05s with targeted drills</p>
                  <Button size="sm" className="mt-3 bg-orange-500 hover:bg-orange-600">View Plan</Button>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">Recent NIL Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeals.slice(0, 3).map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
                      <div><p className="font-medium text-white">{deal.brand}</p><p className="text-sm text-gray-400">{deal.type} - {deal.duration}</p></div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">${deal.value.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${deal.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{deal.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Your NIL Deals</h3>
              <Button className="bg-cyan-500 hover:bg-cyan-600">Browse Opportunities</Button>
            </div>
            <div className="grid gap-4">
              {recentDeals.map((deal) => (
                <Card key={deal.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl font-bold">{deal.brand[0]}</div>
                        <div><p className="font-bold text-white text-lg">{deal.brand}</p><p className="text-gray-400">{deal.type}</p></div>
                      </div>
                      <div className="text-center"><p className="text-sm text-gray-400">Duration</p><p className="text-white font-medium">{deal.duration}</p></div>
                      <div className="text-center"><p className="text-sm text-gray-400">Value</p><p className="text-2xl font-bold text-green-400">${deal.value.toLocaleString()}</p></div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${deal.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{deal.status}</span>
                        <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400">Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fuelbot" className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center"><img src="/images/diamond-grind.png" alt="FUEL Bot" className="w-10 h-10" /></div>
                <div><h3 className="text-2xl font-bold text-white">FUEL Bot AI</h3><p className="text-gray-300">Your Personal Performance Optimizer</p></div>
              </div>
              <p className="text-gray-300">FUEL Bot analyzes your training data, recovery metrics, and performance trends to deliver personalized recommendations that maximize your athletic potential.</p>
            </div>
            <h3 className="text-xl font-bold">Today's Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {fuelBotRecommendations.map((rec) => (
                <Card key={rec.id} className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">{rec.type[0]}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-gray-300">{rec.type}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${rec.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{rec.priority} Priority</span>
                        </div>
                        <h4 className="font-bold text-white mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-400">{rec.description}</p>
                        <Button size="sm" variant="outline" className="mt-3 border-orange-500 text-orange-400 hover:bg-orange-500/10">Start Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Performance Metrics</h3>
              <Button variant="outline" className="border-cyan-500 text-cyan-400">Log Workout</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                    <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{metric.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">Overall Performance Score</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1"><Progress value={athleteData.performanceScore} className="h-4" /></div>
                  <span className="text-2xl font-bold text-cyan-400">{athleteData.performanceScore}/100</span>
                </div>
                <p className="text-gray-400 mt-2">You're in the top 15% of athletes in your position</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-slate-800/50 border-slate-700"><CardContent className="p-4 text-center"><p className="text-gray-400 text-sm">Total Earnings (YTD)</p><p className="text-3xl font-bold text-green-400">$48,300</p></CardContent></Card>
              <Card className="bg-slate-800/50 border-slate-700"><CardContent className="p-4 text-center"><p className="text-gray-400 text-sm">This Month</p><p className="text-3xl font-bold text-cyan-400">${athleteData.monthlyEarnings.toLocaleString()}</p></CardContent></Card>
              <Card className="bg-slate-800/50 border-slate-700"><CardContent className="p-4 text-center"><p className="text-gray-400 text-sm">Pending Payments</p><p className="text-3xl font-bold text-yellow-400">$2,500</p></CardContent></Card>
            </div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">Earnings History</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {earningsHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
                      <span className="text-gray-300">{item.month}</span>
                      <span className="font-bold text-green-400">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-slate-800 py-6 mt-12">
        <div className="container text-center text-gray-500 text-sm">
          <p>ATHLYNX Athlete Dashboard | Powered by Softmor Inc | A Dozier Holdings Group Company</p>
        </div>
      </footer>
    </div>
  );
}
