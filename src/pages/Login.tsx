
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Scale } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
        className: "bg-white border-green-200 text-green-800",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md legal-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-legal-blue-100 rounded-full w-fit">
            <Scale className="h-8 w-8 text-legal-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-legal-slate-900">Welcome Back</CardTitle>
          <CardDescription className="text-legal-slate-600">
            Sign in to access the Legal NER Suite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-legal-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-legal-blue-600 hover:text-legal-blue-500 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-legal-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-legal-blue-600 mt-0.5" />
              <div className="text-xs text-legal-blue-700">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Police Officer: officer / password</p>
                <p>Researcher: researcher / password</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
