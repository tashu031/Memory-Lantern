// API Service for communicating with FastAPI backend & Ollama

const API_BASE = "/api";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`Backend returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return {
      status: "unreachable",
      ollama_connected: false,
      ollama_url: "http://localhost:11434",
      active_model: "gemma3:1b",
      installed_models: [],
      model_ready: false,
      message: "FastAPI backend server is not responding at port 8000. Please start the backend.",
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
    console.warn("Could not retrieve models list:", err);
    return { models: [], default: "gemma3:1b" };
  }
}

export async function generateAITribute(payload) {
  const response = await fetch(`${API_BASE}/generate-tribute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
