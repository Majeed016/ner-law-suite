
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Search, Scale, Shield, Brain, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const policeFeatures = [
    {
      icon: FileText,
      title: 'FIR Assistant',
      description: 'AI-powered FIR drafting with entity recognition and section prediction',
      link: '/fir-assistant',
      color: 'bg-legal-indigo-100 text-legal-indigo-600'
    }
  ];

  const researcherFeatures = [
    {
      icon: Search,
      title: 'Legal Research',
      description: 'Find similar cases across Supreme Court and High Court databases',
      link: '/legal-research',
      color: 'bg-legal-teal-100 text-legal-teal-600'
    },
    {
      icon: Scale,
      title: 'Case Prediction',
      description: 'Predict applicable BNS and IPC sections with confidence scores',
      link: '/case-prediction',
      color: 'bg-legal-gold-100 text-legal-gold-600'
    }
  ];

  const features = user?.role === 'police' ? policeFeatures : researcherFeatures;

  return (
    <div className="min-h-screen bg-legal-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-legal-indigo-100 rounded-full p-3">
              {user?.role === 'police' ? (
                <Shield className="h-8 w-8 text-legal-indigo-600" />
              ) : (
                <Brain className="h-8 w-8 text-legal-teal-600" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-legal-slate-900">
                Welcome, {user?.name}
              </h1>
              <p className="text-legal-slate-600">
                {user?.role === 'police' 
                  ? 'Access your law enforcement tools' 
                  : 'Explore legal research and analytics'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="legal-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600">Active Cases</p>
                  <p className="text-2xl font-bold text-legal-slate-900">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-legal-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="legal-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600">
                    {user?.role === 'police' ? 'FIRs Drafted' : 'Cases Researched'}
                  </p>
                  <p className="text-2xl font-bold text-legal-slate-900">156</p>
                </div>
                <FileText className="h-8 w-8 text-legal-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="legal-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-legal-slate-600">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-legal-slate-900">94%</p>
                </div>
                <Scale className="h-8 w-8 text-legal-gold-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-legal-slate-900">Your Tools</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="legal-card hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-full p-3 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-legal-slate-900">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-legal-slate-600">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to={feature.link}>
                    <Button className="btn-primary w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-legal-slate-900 mb-6">Recent Activity</h2>
          <Card className="legal-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-legal-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-legal-indigo-100 rounded-full p-2">
                      <FileText className="h-4 w-4 text-legal-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-legal-slate-900">
                        {user?.role === 'police' ? 'FIR Draft Completed' : 'Case Analysis Completed'}
                      </p>
                      <p className="text-sm text-legal-slate-600">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-legal-slate-500">94% confidence</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-legal-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-legal-teal-100 rounded-full p-2">
                      <Search className="h-4 w-4 text-legal-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-legal-slate-900">
                        {user?.role === 'police' ? 'Section Prediction' : 'Similar Cases Found'}
                      </p>
                      <p className="text-sm text-legal-slate-600">5 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-legal-slate-500">15 results</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-legal-gold-100 rounded-full p-2">
                      <Scale className="h-4 w-4 text-legal-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-legal-slate-900">Export Generated</p>
                      <p className="text-sm text-legal-slate-600">1 day ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-legal-slate-500">PDF, JSON</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
