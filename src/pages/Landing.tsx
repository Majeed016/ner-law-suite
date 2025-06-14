import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Shield, Search, FileText, Brain, Gavel, Star, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-slate-50 to-legal-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="space-y-8 fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-legal-slate-900 leading-tight">
                  Legal NER
                  <span className="block hero-gradient bg-clip-text text-transparent">
                    Suite
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-legal-slate-600 max-w-2xl font-medium">
                  Empower your role in justice. AI-powered legal automation for every profession.
                </p>
              </div>
              
              <p className="text-lg text-legal-slate-700 max-w-2xl leading-relaxed">
                Streamline police investigations and legal research with intelligent tools for FIR drafting, 
                case prediction, and comprehensive legal analysis powered by advanced NLP technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="btn-primary text-lg group">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" className="bg-legal-blue-600 hover:bg-legal-blue-700 text-white text-lg px-8 py-4">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Enhanced Illustration */}
            <div className="relative lg:pl-8">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <Scale className="h-12 w-12 text-legal-indigo-600 icon-hover" />
                  <div>
                    <h3 className="text-lg font-semibold text-legal-slate-900">Legal Analytics</h3>
                    <p className="text-legal-slate-600">AI-Powered Insights</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-legal-slate-700">Case Analysis</span>
                    <span className="text-sm text-legal-slate-500">94%</span>
                  </div>
                  <div className="h-3 bg-legal-slate-200 rounded-full">
                    <div className="h-3 bg-legal-indigo-600 rounded-full w-[94%] animate-pulse"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-legal-slate-700">Section Prediction</span>
                    <span className="text-sm text-legal-slate-500">89%</span>
                  </div>
                  <div className="h-3 bg-legal-slate-200 rounded-full">
                    <div className="h-3 bg-legal-teal-600 rounded-full w-[89%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-legal-slate-700">Document Processing</span>
                    <span className="text-sm text-legal-slate-500">96%</span>
                  </div>
                  <div className="h-3 bg-legal-slate-200 rounded-full">
                    <div className="h-3 bg-green-600 rounded-full w-[96%]"></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating elements */}
              <div className="absolute -top-4 -right-4 bg-legal-blue-500 rounded-full p-3 shadow-lg animate-bounce">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-legal-teal-500 rounded-full p-3 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-legal-indigo-500 rounded-full p-2 shadow-lg">
                <Scale className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-legal-slate-900 mb-6">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-legal-slate-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your workflow with specialized tools designed for police officers and legal researchers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Police Officer Features */}
            <Card className="legal-card group bg-legal-blue-50 border-legal-blue-200">
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-legal-indigo-100 rounded-full p-4 group-hover:bg-legal-indigo-200 transition-colors">
                    <Shield className="h-8 w-8 text-legal-indigo-600 icon-hover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-legal-slate-900">👮 Police Officers</h3>
                    <p className="text-legal-slate-600 font-medium">Law Enforcement Tools</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FileText className="h-6 w-6 text-legal-indigo-600 mt-1 icon-hover" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900 mb-2">FIR Drafting Assistant</h4>
                      <p className="text-legal-slate-600 leading-relaxed">AI-powered FIR generation with NER entity recognition and intelligent suggestions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Brain className="h-6 w-6 text-legal-indigo-600 mt-1 icon-hover" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900 mb-2">BNS/IPC Prediction</h4>
                      <p className="text-legal-slate-600 leading-relaxed">Automatic section prediction with detailed punishment information and confidence scores</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Researcher Features */}
            <Card className="legal-card group bg-legal-blue-50 border-legal-blue-200">
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-legal-teal-100 rounded-full p-4 group-hover:bg-legal-teal-200 transition-colors">
                    <Search className="h-8 w-8 text-legal-teal-600 icon-hover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-legal-slate-900">🧠 Legal Researchers</h3>
                    <p className="text-legal-slate-600 font-medium">Research & Analysis Tools</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Search className="h-6 w-6 text-legal-teal-600 mt-1 icon-hover" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900 mb-2">Legal Research</h4>
                      <p className="text-legal-slate-600 leading-relaxed">Find similar cases across Supreme Court, High Court databases with intelligent matching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Scale className="h-6 w-6 text-legal-teal-600 mt-1 icon-hover" />
                    <div>
                      <h4 className="font-semibold text-legal-slate-900 mb-2">Case Prediction</h4>
                      <p className="text-legal-slate-600 leading-relaxed">Predict applicable sections with confidence scores and comprehensive analysis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-legal-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-legal-slate-900 mb-4">
              Trusted by Legal Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg border-0 p-8">
              <CardContent>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-legal-blue-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-legal-slate-700 mb-6 italic leading-relaxed">
                  "This tool cut our FIR writing time in half. The AI predictions are incredibly accurate and help us focus on investigation rather than paperwork."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="bg-legal-indigo-100 rounded-full p-2">
                    <Shield className="h-6 w-6 text-legal-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-legal-slate-900">Officer Singh</p>
                    <p className="text-legal-slate-600">Delhi Police</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 p-8">
              <CardContent>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-legal-blue-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-legal-slate-700 mb-6 italic leading-relaxed">
                  "The case research feature is a game-changer. Finding relevant precedents across multiple court databases has never been easier."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="bg-legal-teal-100 rounded-full p-2">
                    <Brain className="h-6 w-6 text-legal-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-legal-slate-900">Dr. Priya Sharma</p>
                    <p className="text-legal-slate-600">Legal Research Institute</p>
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
          <p className="text-xl text-legal-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of legal professionals already using Legal NER Suite to streamline their work
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-legal-indigo-600 hover:bg-legal-slate-50 text-lg px-12 py-4 group">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-legal-slate-900 text-legal-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">Legal NER Suite © 2025 · All Rights Reserved · Built with 💼 & ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
