
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Shield, Search, FileText, Brain, Gavel } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-slate-50 to-legal-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-legal-slate-900 leading-tight">
                  Legal NER
                  <span className="block hero-gradient bg-clip-text text-transparent">
                    Suite
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-legal-slate-600 max-w-2xl">
                  Automating Law Enforcement & Legal Research with AI
                </p>
              </div>
              
              <p className="text-lg text-legal-slate-700 max-w-2xl">
                Empower police officers and legal researchers with intelligent tools for FIR drafting, 
                case prediction, and comprehensive legal analysis powered by advanced NLP technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="btn-primary text-lg px-8 py-4">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="relative lg:pl-8">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <Scale className="h-12 w-12 text-legal-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-legal-slate-900">Legal Analytics</h3>
                    <p className="text-legal-slate-600">AI-Powered Insights</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-legal-indigo-200 rounded-full">
                    <div className="h-2 bg-legal-indigo-600 rounded-full w-4/5 animate-pulse-glow"></div>
                  </div>
                  <div className="h-2 bg-legal-teal-200 rounded-full">
                    <div className="h-2 bg-legal-teal-600 rounded-full w-3/5"></div>
                  </div>
                  <div className="h-2 bg-legal-gold-200 rounded-full">
                    <div className="h-2 bg-legal-gold-600 rounded-full w-4/6"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-legal-gold-500 rounded-full p-3 shadow-lg animate-bounce">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-legal-teal-500 rounded-full p-3 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-legal-slate-900 mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-legal-slate-600 max-w-3xl mx-auto">
              Streamline your workflow with specialized tools designed for police officers and legal researchers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Police Officer Features */}
            <Card className="legal-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-legal-indigo-100 rounded-full p-3">
                    <Shield className="h-8 w-8 text-legal-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-legal-slate-900">Police Officers</h3>
                    <p className="text-legal-slate-600">Law Enforcement Tools</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-legal-indigo-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900">FIR Drafting Assistant</h4>
                      <p className="text-legal-slate-600">AI-powered FIR generation with NER entity recognition</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-legal-indigo-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900">BNS/IPC Prediction</h4>
                      <p className="text-legal-slate-600">Automatic section prediction with punishment details</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Researcher Features */}
            <Card className="legal-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-legal-teal-100 rounded-full p-3">
                    <Search className="h-8 w-8 text-legal-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-legal-slate-900">Legal Researchers</h3>
                    <p className="text-legal-slate-600">Research & Analysis Tools</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Search className="h-5 w-5 text-legal-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900">Legal Research</h4>
                      <p className="text-legal-slate-600">Find similar cases across Supreme Court, High Court databases</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Scale className="h-5 w-5 text-legal-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900">Case Prediction</h4>
                      <p className="text-legal-slate-600">Predict applicable sections with confidence scores</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Legal Workflow?
          </h2>
          <p className="text-xl text-legal-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals already using Legal NER Suite to streamline their work
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-legal-indigo-600 hover:bg-legal-slate-50 text-lg px-8 py-4">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-legal-slate-900 text-legal-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Legal NER Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
