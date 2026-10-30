import asyncio
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    print("Health check response code:", res.status_code)
    print("Health check data:", res.json())
    assert res.status_code == 200
    assert "ollama_connected" in res.json()

def test_models():
    res = client.get("/api/models")
    print("Models response code:", res.status_code)
    print("Models data:", res.json())
    assert res.status_code in (200, 503)

if __name__ == "__main__":
    test_health()
    test_models()
    print("API unit tests passed!")
