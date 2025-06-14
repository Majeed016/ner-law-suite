import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Legal NER Suite.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-blue-50 to-legal-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 bg-legal-blue-500 p-6 rounded-xl">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <Scale className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Legal NER Suite</span>
          </Link>
        </div>

        <Card className="legal-card bg-white border-legal-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-legal-slate-900">
              Login to Legal NER Suite
            </CardTitle>
            <CardDescription className="text-legal-slate-600">
              Access your professional legal tools
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 bg-white">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-legal-slate-500 hover:text-legal-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-legal-indigo-600 hover:text-legal-indigo-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <span className="text-white">Login</span>
                )}
              </Button>

              <p className="text-center text-sm text-legal-slate-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-legal-indigo-600 hover:text-legal-indigo-700 font-medium hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Demo credentials */}
        <Card className="mt-4 bg-legal-blue-100 border-legal-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-legal-slate-900 mb-2">Demo Credentials:</h4>
            <div className="space-y-1 text-sm text-legal-slate-700">
              <p><strong>Police Officer:</strong> officer@demo.com</p>
              <p><strong>Legal Researcher:</strong> researcher@demo.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
