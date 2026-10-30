import asyncio
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    print("Health check response code:", res.status_code)
    data = res.json()
    print("Health check data:", data)
    assert res.status_code == 200
    assert "ollama_connected" in data
    assert data.get("ollama_connected") is True
    assert data.get("model_ready") is True
    assert data.get("active_model") == "gemma2:2b"
    assert "gemma2:2b" in data.get("installed_models", [])

def test_models():
    res = client.get("/api/models")
    print("Models response code:", res.status_code)
    data = res.json()
    print("Models data:", data)
    assert res.status_code == 200
    assert "models" in data
    assert "gemma2:2b" in data.get("models", [])

def test_generate_tribute_validation():
    # Missing name should return 422
    res = client.post("/api/generate-tribute", json={
        "relationship": "Grandmother",
        "style": "Heartfelt",
        "tribute_type": "letter"
    })
    assert res.status_code == 422
    print("Validation error handling test passed (422)!")

if __name__ == "__main__":
    test_health()
    test_models()
    test_generate_tribute_validation()
    print("All backend unit tests passed!")
