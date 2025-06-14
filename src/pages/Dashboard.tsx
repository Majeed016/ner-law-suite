
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Search, Scale, Shield, Brain, TrendingUp, Activity, Target, Clock, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const policeFeatures = [
    {
      icon: FileText,
      title: 'FIR Assistant',
      description: 'AI-powered FIR drafting with entity recognition and section prediction',
      link: '/fir-assistant',
      color: 'bg-legal-indigo-100 text-legal-indigo-600',
      hoverColor: 'group-hover:bg-legal-indigo-200'
    }
  ];

  const researcherFeatures = [
    {
      icon: Search,
      title: 'Legal Research',
      description: 'Find similar cases across Supreme Court and High Court databases',
      link: '/legal-research',
      color: 'bg-legal-teal-100 text-legal-teal-600',
      hoverColor: 'group-hover:bg-legal-teal-200'
    },
    {
      icon: Scale,
      title: 'Case Prediction',
      description: 'Predict applicable BNS and IPC sections with confidence scores',
      link: '/case-prediction',
      color: 'bg-purple-100 text-purple-600',
      hoverColor: 'group-hover:bg-purple-200'
    }
  ];

  const features = user?.role === 'police' ? policeFeatures : researcherFeatures;

  const recentActivities = [
    {
      icon: FileText,
      title: user?.role === 'police' ? 'FIR Draft Completed' : 'Case Analysis Completed',
      time: '2 hours ago',
      status: '94% confidence',
      court: user?.role === 'police' ? '' : 'Supreme Court',
      color: 'bg-legal-indigo-100 text-legal-indigo-600'
    },
    {
      icon: Search,
      title: user?.role === 'police' ? 'Section Prediction' : 'Similar Cases Found',
      time: '5 hours ago',
      status: '15 results',
      court: user?.role === 'police' ? '' : 'High Court',
      color: 'bg-legal-teal-100 text-legal-teal-600'
    },
    {
      icon: Scale,
      title: 'Export Generated',
      time: '1 day ago',
      status: 'PDF, JSON',
      court: user?.role === 'police' ? '' : 'District Court',
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className={`rounded-full p-4 ${user?.role === 'police' ? 'bg-legal-indigo-100' : 'bg-legal-teal-100'}`}>
              {user?.role === 'police' ? (
                <Shield className="h-10 w-10 text-legal-indigo-600" />
              ) : (
                <Brain className="h-10 w-10 text-legal-teal-600" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-legal-slate-900 mb-2">
                Welcome back, {user?.name}
              </h1>
              <p className="text-lg text-legal-slate-600">
                {user?.role === 'police' 
                  ? 'Access your law enforcement tools and manage your cases efficiently' 
                  : 'Explore legal research and analytics with powerful AI assistance'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="stat-card group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600 mb-1">Active Cases</p>
                  <p className="text-3xl font-bold text-legal-slate-900">24</p>
                  <p className="text-sm text-green-600 font-medium">+12% this month</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                  <Activity className="h-8 w-8 text-blue-600 icon-hover" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600 mb-1">
                    {user?.role === 'police' ? 'FIRs Drafted' : 'Cases Researched'}
                  </p>
                  <p className="text-3xl font-bold text-legal-slate-900">156</p>
                  <p className="text-sm text-green-600 font-medium">+8% this week</p>
                </div>
                <div className="bg-legal-teal-100 rounded-full p-3 group-hover:bg-legal-teal-200 transition-colors">
                  <FileText className="h-8 w-8 text-legal-teal-600 icon-hover" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600 mb-1">Accuracy Rate</p>
                  <p className="text-3xl font-bold text-legal-slate-900">94%</p>
                  <p className="text-sm text-green-600 font-medium">Excellent performance</p>
                </div>
                <div className="bg-green-100 rounded-full p-3 group-hover:bg-green-200 transition-colors">
                  <Target className="h-8 w-8 text-green-600 icon-hover" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-legal-slate-900">Your Tools</h2>
            <div className="text-sm text-legal-slate-500">
              {user?.role === 'police' ? 'Law Enforcement' : 'Research & Analysis'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="legal-card group border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-6">
                    <div className={`rounded-xl p-4 ${feature.color} ${feature.hoverColor} transition-colors`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-legal-slate-900 mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-legal-slate-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={feature.link}>
                    <Button className="btn-primary w-full group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-legal-slate-900">Recent Activity</h2>
            <Button variant="outline" className="text-legal-slate-600 hover:text-legal-indigo-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <Card className="stat-card border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-legal-slate-100 last:border-b-0 hover:bg-legal-slate-50 rounded-lg px-4 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-full p-3 ${activity.color}`}>
                        <activity.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-legal-slate-900 mb-1">
                          {activity.title}
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-legal-slate-400" />
                            <p className="text-sm text-legal-slate-600">{activity.time}</p>
                          </div>
                          {activity.court && (
                            <span className="court-badge">{activity.court}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-legal-slate-700 bg-legal-slate-100 px-3 py-1 rounded-full">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
