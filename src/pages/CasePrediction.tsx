
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Scale, Brain, Download, AlertCircle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { apiService, NERResponse } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const CasePrediction: React.FC = () => {
  const [description, setDescription] = useState('');
  
  const { data: predictionResults, loading, execute } = useApi<NERResponse>();
  const { toast } = useToast();

  const handlePredict = async () => {
    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please enter an incident description.",
        variant: "destructive",
      });
      return;
    }

    try {
      await execute(() => apiService.predictSections(description));
      toast({
        title: "Prediction completed",
        description: "BNS and IPC sections have been predicted.",
      });
    } catch (error) {
      console.error('Error predicting sections:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-legal-slate-900 mb-4">Case Prediction</h1>
          <p className="text-lg text-legal-slate-600">
            Predict applicable BNS and IPC sections with confidence scores
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Incident Description</span>
                </CardTitle>
                <CardDescription>
                  Describe the incident for section prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Incident Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the incident in detail, including the nature of the offense, circumstances, and any relevant facts..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={10}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handlePredict} 
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Analyzing...' : 'Predict Sections'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {predictionResults?.predictions && predictionResults.predictions.length > 0 && (
              <Card className="legal-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Predicted Sections</span>
                    {predictionResults.json_href && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={predictionResults.json_href} download="predictions.json">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </a>
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Applicable BNS and IPC sections with confidence scores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predictionResults.predictions.map((prediction, index) => (
                    <div key={index} className="border border-legal-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Scale className="h-4 w-4 text-legal-blue-600" />
                            <span className="font-semibold text-legal-slate-900">
                              Section {prediction.section}
                            </span>
                            <span className="bg-legal-blue-100 text-legal-blue-700 px-2 py-1 rounded text-xs">
                              {prediction.section.startsWith('3') ? 'BNS' : 'IPC'}
                            </span>
                          </div>
                          <h3 className="font-medium text-legal-slate-800 mb-2">
                            {prediction.name}
                          </h3>
                          <p className="text-sm text-legal-slate-600 mb-3">
                            <strong>Punishment:</strong> {prediction.punishment}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-legal-slate-600">Confidence Score</span>
                          <span className="font-medium text-legal-slate-900">
                            {(prediction.score * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={prediction.score * 100} 
                          className="h-2"
                        />
                        {prediction.score < 0.7 && (
                          <div className="flex items-center space-x-1 text-orange-600 text-xs">
                            <AlertCircle className="h-3 w-3" />
                            <span>Low confidence - review manually</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {predictionResults?.predictions && predictionResults.predictions.length === 0 && (
              <Card className="legal-card">
                <CardContent className="text-center py-8">
                  <Brain className="h-12 w-12 text-legal-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-legal-slate-900 mb-2">No Sections Predicted</h3>
                  <p className="text-legal-slate-600">
                    The AI model couldn't predict any applicable sections. Try providing more detailed incident information.
                  </p>
                </CardContent>
              </Card>
            )}

            {!predictionResults && (
              <Card className="legal-card">
                <CardContent className="text-center py-12">
                  <Scale className="h-16 w-16 text-legal-slate-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-legal-slate-900 mb-2">
                    Ready for Section Prediction
                  </h3>
                  <p className="text-legal-slate-600">
                    Enter an incident description to get AI-powered predictions of applicable BNS and IPC sections.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePrediction;
