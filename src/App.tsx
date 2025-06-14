
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen w-full">
            <Navbar />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Placeholder routes for future implementation */}
              <Route 
                path="/fir-assistant" 
                element={
                  <ProtectedRoute allowedRoles={['police']}>
                    <div className="min-h-screen bg-legal-slate-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-legal-slate-900 mb-4">FIR Assistant</h1>
                        <p className="text-legal-slate-600">Coming soon - AI-powered FIR drafting tool</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/legal-research" 
                element={
                  <ProtectedRoute allowedRoles={['researcher']}>
                    <div className="min-h-screen bg-legal-slate-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-legal-slate-900 mb-4">Legal Research</h1>
                        <p className="text-legal-slate-600">Coming soon - Case search and analysis tool</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/case-prediction" 
                element={
                  <ProtectedRoute allowedRoles={['researcher']}>
                    <div className="min-h-screen bg-legal-slate-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-legal-slate-900 mb-4">Case Prediction</h1>
                        <p className="text-legal-slate-600">Coming soon - BNS/IPC section prediction tool</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
