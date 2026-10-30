// Centralized API Service for communicating with FastAPI backend & Ollama

// Determine API base URL:
// 1. In production, VITE_API_URL can be set (e.g. 'https://memory-lantern-backend.onrender.com')
// 2. In local development or when VITE_API_URL is unset, defaults to '/api' which uses the Vite proxy
function resolveApiBase() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) {
    return '/api';
  }
  const cleanUrl = envUrl.trim().replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
}

export const API_BASE = resolveApiBase();

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Backend returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return {
      status: 'unreachable',
      ollama_connected: false,
      ollama_url: 'remote/local instance',
      active_model: 'gemma2:2b',
      installed_models: [],
      model_ready: false,
      message: `FastAPI backend server is not responding at ${API_BASE}. Please ensure the backend service is running.`,
    };
  }
}

export async function getAvailableModels() {
  try {
    const res = await fetch(`${API_BASE}/models`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to fetch models: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Could not retrieve models list:', err);
    return { models: [], default: 'gemma2:2b' };
  }
}

export async function generateAITribute(payload) {
  const response = await fetch(`${API_BASE}/generate-tribute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || `Request failed with status ${response.status}`;
    const errorObj = new Error(errorMsg);
    errorObj.status = response.status;
    errorObj.data = data;
    throw errorObj;
  }

  return data;
}
