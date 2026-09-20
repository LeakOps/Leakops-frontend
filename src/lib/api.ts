const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api/v1';

export const TOKEN_KEY = 'leakops_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  provider?: string;
  profile_picture_url?: string;
  created_at?: string;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface GatewayAccount {
  id: string;
  gateway_type: 'stripe' | 'dodo' | string;
  is_active: boolean;
  connected_at: string;
  last_four: string;
}

export interface DashboardSummary {
  revenue_at_risk_cents: number;
  recovered_cents: number;
  recovery_rate: number;
  total_failed_payments: number;
}

export interface DashboardPayment {
  id: string;
  customer_name: string;
  customer_email: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'retrying' | 'recovered' | 'failed' | string;
  retry_count: number;
  next_try_at: string;
  created_at: string;
}

export interface SubscriptionInfo {
  plan: string;
  status: string;
  current_period_end?: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) {
        errorMsg = data.error;
      }
    } catch {
      // Not JSON or empty body
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type') && options.method && options.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// API Methods
export const api = {
  // Auth
  async login(payload: { email: string; password: string }): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setToken(data.token);
    return data;
  },

  async signup(payload: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setToken(data.token);
    return data;
  },

  getGoogleAuthUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  },

  getGithubAuthUrl(): string {
    return `${API_BASE_URL}/auth/github`;
  },

  // Profile
  async getProfile(): Promise<{ user: ApiUser }> {
    return apiRequest<{ user: ApiUser }>('/profile/me', {
      method: 'GET',
    });
  },

  async uploadProfilePicture(file: File): Promise<{ profile_picture_url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return apiRequest<{ profile_picture_url: string }>('/profile/picture', {
      method: 'POST',
      body: formData,
    });
  },

  // Gateways
  async getGateways(): Promise<{ gateways: GatewayAccount[] }> {
    return apiRequest<{ gateways: GatewayAccount[] }>('/gateway', {
      method: 'GET',
    });
  },

  async connectGateway(payload: { gateway_type: 'stripe' | 'dodo'; api_key: string }): Promise<{
    message: string;
    gateway: { id: string; gateway_type: string; is_active: boolean };
  }> {
    return apiRequest('/gateway/connect', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async disconnectGateway(id: string): Promise<{ message: string }> {
    return apiRequest(`/gateway/${id}`, {
      method: 'DELETE',
    });
  },

  // Dashboard
  async getDashboardSummary(): Promise<DashboardSummary> {
    return apiRequest<DashboardSummary>('/dashboard/summary', {
      method: 'GET',
    });
  },

  async getDashboardPayments(): Promise<{ payments: DashboardPayment[] }> {
    return apiRequest<{ payments: DashboardPayment[] }>('/dashboard/payments', {
      method: 'GET',
    });
  },

  async downloadPaymentsCSV(): Promise<void> {
    const token = getToken();
    const headers = new Headers();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${API_BASE_URL}/dashboard/export`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      throw new Error('Failed to export payments CSV');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leakops_payments.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Billing
  async createCheckout(plan: 'starter' | 'growth' | 'scale'): Promise<{ checkout_url: string }> {
    return apiRequest<{ checkout_url: string }>('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  },

  async getSubscription(): Promise<SubscriptionInfo> {
    return apiRequest<SubscriptionInfo>('/billing/subscription', {
      method: 'GET',
    });
  },

  async contactSales(payload: { company_name: string; message: string }): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/billing/contact-sales', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
