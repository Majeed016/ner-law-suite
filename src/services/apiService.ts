
const API_BASE_URL = 'http://localhost:5000'; // Your Flask backend URL

export interface NERResult {
  entity_group: string;
  word: string;
  start: number;
  end: number;
  score: number;
}

export interface FIRTemplate {
  Date: string;
  Place: string;
  Accused: string;
  Offense: string;
  Provision: string;
  Description: string;
  Court: string;
  Petitioner: string;
  Witness: string;
  CaseNumber: string;
  Precedent: string;
  Judge: string;
  Lawyer: string;
  Organization: string;
  OtherPerson: string;
  Address: string;
  "Predicted Sections": Array<[string, number]>;
}

export interface SimilarCase {
  id: string;
  title: string;
  text: string;
  court: string;
}

export interface Prediction {
  section: string;
  name: string;
  punishment: string;
  score: number;
}

export interface NERResponse {
  results: NERResult[];
  fir_template?: FIRTemplate;
  highlighted_text?: string;
  keywords?: string[];
  similar_cases?: SimilarCase[];
  predictions?: Prediction[];
  plot_html?: string;
  json_href?: string;
  pdf_href?: string;
  record_id: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication
  async login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  async register(username: string, email: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  async logout() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  }

  // NER Operations
  async processFIR(description: string, inputType: 'text' | 'file' = 'text', file?: File): Promise<NERResponse> {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('active_tab', 'fir');
    formData.append('input_type', inputType);
    
    if (file && inputType === 'file') {
      formData.append('file', file);
    }

    const response = await fetch(`${API_BASE_URL}/ner`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to process FIR: ${response.statusText}`);
    }

    return response.json();
  }

  async searchLegalCases(query: string, courtFilter: string = 'All'): Promise<NERResponse> {
    const formData = new FormData();
    formData.append('description', query);
    formData.append('active_tab', 'research');
    formData.append('court_filter', courtFilter);

    const response = await fetch(`${API_BASE_URL}/ner`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to search cases: ${response.statusText}`);
    }

    return response.json();
  }

  async predictSections(description: string): Promise<NERResponse> {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('active_tab', 'predict');

    const response = await fetch(`${API_BASE_URL}/ner`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to predict sections: ${response.statusText}`);
    }

    return response.json();
  }

  async finalizeFIR(recordId: string, firData: Partial<FIRTemplate>): Promise<any> {
    const formData = new FormData();
    formData.append('record_id', recordId);
    
    Object.entries(firData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key.toLowerCase(), String(value));
      }
    });

    const response = await fetch(`${API_BASE_URL}/finalize_fir`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to finalize FIR: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
