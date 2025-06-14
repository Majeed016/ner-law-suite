
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Download, Eye } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { apiService, NERResponse, FIRTemplate } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const FirAssistant: React.FC = () => {
  const [description, setDescription] = useState('');
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firTemplate, setFirTemplate] = useState<FIRTemplate | null>(null);
  const [recordId, setRecordId] = useState<string>('');
  
  const { data: nerResponse, loading, execute } = useApi<NERResponse>();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid JSON file.",
        variant: "destructive",
      });
    }
  };

  const handleProcessFIR = async () => {
    if (inputType === 'text' && !description.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a case description.",
        variant: "destructive",
      });
      return;
    }

    if (inputType === 'file' && !selectedFile) {
      toast({
        title: "Missing file",
        description: "Please select a JSON file.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await execute(() => 
        apiService.processFIR(description, inputType, selectedFile || undefined)
      );
      
      if (response?.fir_template) {
        setFirTemplate(response.fir_template);
        setRecordId(response.record_id);
        toast({
          title: "FIR processed successfully",
          description: "Review the generated FIR template below.",
        });
      }
    } catch (error) {
      console.error('Error processing FIR:', error);
    }
  };

  const handleFinalizeFIR = async () => {
    if (!firTemplate || !recordId) {
      toast({
        title: "No FIR data",
        description: "Please process a case description first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await execute(() => apiService.finalizeFIR(recordId, firTemplate));
      toast({
        title: "FIR finalized",
        description: "Your FIR has been saved and is ready for download.",
      });
    } catch (error) {
      console.error('Error finalizing FIR:', error);
    }
  };

  const updateFirField = (field: keyof FIRTemplate, value: string) => {
    if (firTemplate) {
      setFirTemplate({ ...firTemplate, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-legal-slate-900 mb-4">FIR Assistant</h1>
          <p className="text-lg text-legal-slate-600">
            AI-powered FIR drafting with entity recognition and section prediction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Case Input</span>
                </CardTitle>
                <CardDescription>
                  Enter case details or upload a JSON file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={inputType} onValueChange={(value) => setInputType(value as 'text' | 'file')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="description">Case Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter the case description, including details about the incident, parties involved, and relevant circumstances..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="file" className="space-y-4">
                    <div>
                      <Label htmlFor="file">Upload JSON File</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Input
                          id="file"
                          type="file"
                          accept=".json"
                          onChange={handleFileSelect}
                          className="flex-1"
                        />
                        <Upload className="h-4 w-4 text-legal-slate-500" />
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-legal-slate-600 mt-1">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleProcessFIR} 
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Processing...' : 'Process FIR'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {nerResponse?.results && (
              <Card className="legal-card">
                <CardHeader>
                  <CardTitle>Extracted Entities</CardTitle>
                  <CardDescription>
                    Named entities found in the case description
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {nerResponse.results.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-legal-slate-50 rounded">
                        <span className="font-medium">{entity.word}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm bg-legal-blue-100 text-legal-blue-700 px-2 py-1 rounded">
                            {entity.entity_group}
                          </span>
                          <span className="text-sm text-legal-slate-500">
                            {(entity.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {firTemplate && (
              <Card className="legal-card">
                <CardHeader>
                  <CardTitle>FIR Template</CardTitle>
                  <CardDescription>
                    Review and edit the generated FIR details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="petitioner">Petitioner</Label>
                      <Input
                        id="petitioner"
                        value={firTemplate.Petitioner}
                        onChange={(e) => updateFirField('Petitioner', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accused">Accused</Label>
                      <Input
                        id="accused"
                        value={firTemplate.Accused}
                        onChange={(e) => updateFirField('Accused', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        value={firTemplate.Date}
                        onChange={(e) => updateFirField('Date', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="place">Place</Label>
                      <Input
                        id="place"
                        value={firTemplate.Place}
                        onChange={(e) => updateFirField('Place', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="offense">Offense</Label>
                      <Input
                        id="offense"
                        value={firTemplate.Offense}
                        onChange={(e) => updateFirField('Offense', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="provision">Provision</Label>
                      <Input
                        id="provision"
                        value={firTemplate.Provision}
                        onChange={(e) => updateFirField('Provision', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={firTemplate.Description}
                      onChange={(e) => updateFirField('Description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={handleFinalizeFIR} className="btn-primary">
                      <FileText className="h-4 w-4 mr-2" />
                      Finalize FIR
                    </Button>
                    {nerResponse?.pdf_href && (
                      <Button variant="outline" asChild>
                        <a href={nerResponse.pdf_href} download="fir_template.pdf">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    )}
                    {nerResponse?.json_href && (
                      <Button variant="outline" asChild>
                        <a href={nerResponse.json_href} download="fir_data.json">
                          <Download className="h-4 w-4 mr-2" />
                          Export JSON
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirAssistant;
