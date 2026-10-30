import os
import httpx
from typing import Optional, List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
DEFAULT_OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma2:2b")
CORS_ORIGINS_RAW = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000")
CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS_RAW.split(",") if origin.strip()]

app = FastAPI(
    title="Memory Lantern API",
    description="A Private AI Remembrance Garden API powered by Google Gemma and Ollama",
    version="1.0.0",
)

# Configure CORS (Supports custom domains, Render subdomains, and localhost)
is_wildcard = "*" in CORS_ORIGINS or CORS_ORIGINS_RAW.strip() == "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if is_wildcard else CORS_ORIGINS,
    allow_origin_regex=None if is_wildcard else r"https://.*\.onrender\.com",
    allow_credentials=not is_wildcard,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "name": "Memory Lantern API",
        "status": "healthy",
        "service": "FastAPI",
        "docs": "/docs",
        "health": "/api/health",
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}


class TributeRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=150, description="Name of the person or pet being remembered")
    relationship: str = Field(..., min_length=1, max_length=100, description="Relationship (e.g. Grandmother, Father, Friend, Pet)")
    description: Optional[str] = Field(None, max_length=2000, description="Short life description or context")
    favorite_memories: Optional[str] = Field(None, max_length=3000, description="Cherished moments and stories")
    favorite_food: Optional[str] = Field(None, max_length=500, description="Foods or meals they loved")
    favorite_music: Optional[str] = Field(None, max_length=500, description="Songs, genres, or artists they loved")
    special_qualities: Optional[str] = Field(None, max_length=1000, description="Unique quirks, wisdom, or personality traits")
    date_or_occasion: Optional[str] = Field(None, max_length=200, description="Important date, anniversary, or Día de los Muertos dedication")
    style: str = Field("Heartfelt", description="Writing style: Heartfelt, Poetic, Simple and Personal, Nostalgic")
    tribute_type: str = Field("letter", description="Tribute type: letter, tribute, quotes, message")
    model: Optional[str] = Field(None, description="Optional Ollama model override (defaults to OLLAMA_MODEL env)")


class TributeResponse(BaseModel):
    tribute: str
    model: str
    tribute_type: str
    style: str
    name: str


class HealthResponse(BaseModel):
    status: str
    ollama_connected: bool
    ollama_url: str
    active_model: str
    installed_models: List[str]
    model_ready: bool
    message: str


def build_system_prompt() -> str:
    return (
        "You are Memory Lantern, a sensitive, respectful, and compassionate AI assistant for a private remembrance garden. "
        "Your sacred duty is to honor the memory of loved ones who have passed away or are being cherished. "
        "Strict rules to uphold:\n"
        "1. Write naturally, deeply respectfully, and with genuine warmth and emotional resonance.\n"
        "2. GROUNDING: Strictly use ONLY the facts, anecdotes, qualities, music, foods, and details provided by the user. "
        "Do NOT hallucinate or invent fictional personal events, family members, dates, or stories that were not mentioned.\n"
        "3. Embody the requested writing style faithfully.\n"
        "4. Tone must feel like a warm golden candle lit in peaceful remembrance, never cliché, robotic, or overly melodramatic.\n"
        "5. Do NOT output conversational filler like 'Here is your tribute:' or 'I hope this brings comfort:'. Output only the tribute text itself."
    )


def build_user_prompt(req: TributeRequest) -> str:
    # Build details profile
    details_lines = [
        f"- Honoree Name: {req.name}",
        f"- Relationship: {req.relationship}",
    ]
    if req.description:
        details_lines.append(f"- About them: {req.description.strip()}")
    if req.favorite_memories:
        details_lines.append(f"- Cherished Memories & Stories: {req.favorite_memories.strip()}")
    if req.favorite_food:
        details_lines.append(f"- Favorite Food/Dishes: {req.favorite_food.strip()}")
    if req.favorite_music:
        details_lines.append(f"- Favorite Music/Songs: {req.favorite_music.strip()}")
    if req.special_qualities:
        details_lines.append(f"- Special Qualities & Wisdom: {req.special_qualities.strip()}")
    if req.date_or_occasion:
        details_lines.append(f"- Date / Occasion / Dedication: {req.date_or_occasion.strip()}")

    details_text = "\n".join(details_lines)

    # Style instructions
    style_guidance = {
        "Heartfelt": "Warm, tender, deeply loving, expressing profound gratitude and lasting connection.",
        "Poetic": "Lyrical, evocative imagery of light, lanterns, gentle echoes, nature, and peaceful remembrance.",
        "Simple and Personal": "Direct, authentic, conversational, like whispering a quiet promise to someone you hold dear.",
        "Nostalgic": "Sweetly reflective, painting vivid sensory moments of the past, focusing on small details and timeless memories.",
    }.get(req.style, "Warm, respectful, and comforting.")

    # Tribute format
    format_guidance = {
        "letter": (
            f"Write a heartfelt Remembrance Letter to honor {req.name}. "
            "Address them with love, reminiscing gently on the shared moments, favorite things, and enduring legacy. "
            "Keep it between 3 to 5 graceful paragraphs. Conclude with a warm parting thought."
        ),
        "tribute": (
            f"Write a beautiful Remembrance Tribute Speech / Eulogy dedication for {req.name}. "
            "Celebrate their life, character, laughter, and the distinct light they brought into the world. "
            "Keep it inspiring, poignant, and uplifting."
        ),
        "quotes": (
            f"Craft a collection of 4 to 5 unique, poetic Memory Lantern Quotes and reflections dedicated to {req.name}. "
            "Each quote should be 1-3 sentences, capturing their specific spirit, favorite things, or enduring presence. "
            "Format as numbered quotes."
        ),
        "message": (
            f"Write a personalized Remembrance Altar / Ofrenda Message dedicated to {req.name}. "
            "It should feel like a loving blessing left beside a glowing candle and marigolds, welcoming their spirit and honoring their memory."
        ),
    }.get(req.tribute_type, f"Write an emotional remembrance tribute honoring {req.name}.")

    prompt = (
        f"Please write a tribute based on the following personal remembrance profile:\n\n"
        f"{details_text}\n\n"
        f"Requested Format: {req.tribute_type.upper()}\n"
        f"Format Instructions: {format_guidance}\n\n"
        f"Requested Style: {req.style}\n"
        f"Style Instructions: {style_guidance}\n\n"
        f"Remember: Base your writing solely on the details provided above. Do not invent unmentioned facts. "
        f"Begin the tribute directly without preamble."
    )
    return prompt


@app.get("/api/health", response_model=HealthResponse)
async def check_health():
    """
    Check backend status, Ollama connectivity, and model availability.
    """
    ollama_connected = False
    installed_models: List[str] = []
    target_model = DEFAULT_OLLAMA_MODEL

    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if resp.status_code == 200:
                ollama_connected = True
                data = resp.json()
                raw_models = data.get("models", [])
                for m in raw_models:
                    name = m.get("name") or m.get("model")
                    if name:
                        installed_models.append(name)
    except Exception as e:
        ollama_connected = False

    # Check if target model or any model is ready
    model_ready = False
    if ollama_connected:
        # Check exact or prefix match (e.g., gemma3:1b or gemma3)
        model_ready = any(
            target_model in m or m.startswith(target_model.split(":")[0])
            for m in installed_models
        )
        if not model_ready and len(installed_models) > 0:
            # Check if any gemma model is installed
            gemma_models = [m for m in installed_models if "gemma" in m.lower()]
            if gemma_models:
                message = f"Ollama is running with {len(installed_models)} models installed. Configured model '{target_model}' not found, but '{gemma_models[0]}' is available."
            else:
                message = f"Ollama is running. Configured model '{target_model}' not installed yet. Please run `ollama pull {target_model}`."
        elif model_ready:
            message = f"Ollama is connected and '{target_model}' is ready."
        else:
            message = f"Ollama is connected but no models found. Run `ollama pull {target_model}`."
    else:
        message = f"Cannot reach Ollama at {OLLAMA_BASE_URL}. Ensure Ollama is installed and running (`ollama serve`)."

    return HealthResponse(
        status="ok" if ollama_connected else "degraded",
        ollama_connected=ollama_connected,
        ollama_url=OLLAMA_BASE_URL,
        active_model=target_model,
        installed_models=installed_models,
        model_ready=model_ready,
        message=message,
    )


@app.get("/api/models")
async def list_models():
    """
    List models available in the local Ollama instance.
    """
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Ollama returned status {resp.status_code}",
                )
            data = resp.json()
            models = [m.get("name") for m in data.get("models", []) if m.get("name")]
            return {
                "models": models,
                "default": DEFAULT_OLLAMA_MODEL,
                "base_url": OLLAMA_BASE_URL,
            }
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Unable to connect to Ollama at {OLLAMA_BASE_URL}. Please ensure Ollama is running (`ollama serve`).",
        )


@app.post("/api/generate-tribute", response_model=TributeResponse)
async def generate_tribute(req: TributeRequest):
    """
    Generate an emotional remembrance tribute using Gemma on Ollama.
    """
    selected_model = req.model or DEFAULT_OLLAMA_MODEL

    # Prepare chat payload
    system_prompt = build_system_prompt()
    user_prompt = build_user_prompt(req)

    chat_payload = {
        "model": selected_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "stream": False,
        "options": {
            "temperature": 0.7,
            "top_p": 0.9,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{OLLAMA_BASE_URL}/api/chat",
                json=chat_payload,
            )

            # Check if model not found
            if response.status_code == 404:
                # Query available models to suggest alternative
                installed_list = []
                try:
                    tags_res = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
                    if tags_res.status_code == 200:
                        installed_list = [m.get("name") for m in tags_res.json().get("models", [])]
                except Exception:
                    pass

                avail_str = f" Available models: {', '.join(installed_list)}." if installed_list else ""
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=(
                        f"Model '{selected_model}' was not found in Ollama.{avail_str} "
                        f"Please run `ollama pull {selected_model}` in your terminal or select an installed model."
                    ),
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"Ollama returned error status {response.status_code}: {response.text}",
                )

            result_data = response.json()
            message_obj = result_data.get("message", {})
            generated_text = message_obj.get("content", "").strip()

            if not generated_text:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Ollama returned an empty response. Please try again.",
                )

            return TributeResponse(
                tribute=generated_text,
                model=selected_model,
                tribute_type=req.tribute_type,
                style=req.style,
                name=req.name,
            )

    except httpx.ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                f"Cannot connect to Ollama at {OLLAMA_BASE_URL}. "
                "Please make sure the Ollama service is running and accessible via OLLAMA_BASE_URL."
            ),
        )
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Ollama took too long to generate a response. Please try again or use a smaller model.",
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error while communicating with AI service: {str(exc)}",
        )


if __name__ == "__main__":
    import uvicorn
    # Render sets the PORT environment variable automatically
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host=host, port=port, reload=False)
