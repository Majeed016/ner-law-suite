
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Scale, Download } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { apiService, NERResponse } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const LegalResearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [courtFilter, setCourtFilter] = useState('All');
  
  const { data: searchResults, loading, execute } = useApi<NERResponse>();
  const { toast } = useToast();

  const courtOptions = ['All', 'Supreme Court', 'High Court', 'District Court'];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Missing query",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }

    try {
      await execute(() => apiService.searchLegalCases(query, courtFilter));
      toast({
        title: "Search completed",
        description: "Found similar cases and extracted keywords.",
      });
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-legal-slate-900 mb-4">Legal Research</h1>
          <p className="text-lg text-legal-slate-600">
            Find similar cases across Supreme Court and High Court databases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-1">
            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Case Search</span>
                </CardTitle>
                <CardDescription>
                  Search for similar legal cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="query">Search Query</Label>
                  <Input
                    id="query"
                    placeholder="Enter case details, legal issues, or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="court">Court Filter</Label>
                  <Select value={courtFilter} onValueChange={setCourtFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select court" />
                    </SelectTrigger>
                    <SelectContent>
                      {courtOptions.map((court) => (
                        <SelectItem key={court} value={court}>
                          {court}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSearch} 
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Searching...' : 'Search Cases'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {searchResults?.keywords && (
              <Card className="legal-card">
                <CardHeader>
                  <CardTitle>Extracted Keywords</CardTitle>
                  <CardDescription>
                    Key legal terms and entities found in your query
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.keywords.map((keyword, index) => (
                      <span 
                        key={index}
                        className="bg-legal-blue-100 text-legal-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {searchResults?.similar_cases && searchResults.similar_cases.length > 0 && (
              <Card className="legal-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Similar Cases</span>
                    {searchResults.json_href && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={searchResults.json_href} download="search_results.json">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </a>
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Cases similar to your search query
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {searchResults.similar_cases.map((case_item, index) => (
                    <div key={case_item.id} className="border border-legal-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-legal-slate-900">{case_item.title}</h3>
                        <span className="bg-legal-teal-100 text-legal-teal-700 px-2 py-1 rounded text-xs">
                          {case_item.court}
                        </span>
                      </div>
                      <p className="text-legal-slate-600 text-sm line-clamp-3">
                        {case_item.text}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Scale className="h-4 w-4 text-legal-slate-400" />
                        <span className="text-xs text-legal-slate-500">Case ID: {case_item.id}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {searchResults?.similar_cases && searchResults.similar_cases.length === 0 && (
              <Card className="legal-card">
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 text-legal-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-legal-slate-900 mb-2">No Similar Cases Found</h3>
                  <p className="text-legal-slate-600">
                    Try adjusting your search query or selecting a different court filter.
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

export default LegalResearch;
