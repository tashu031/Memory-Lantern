# 🕯️ Memory Lantern — A Private AI Remembrance Garden

> *"Some memories never fade. They simply find another way to shine."*

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026%20Week%204-EA580C?style=for-the-badge&logo=open-source-initiative&logoColor=white)](https://hacktoberfest.com/)
[![Theme: Ghost in the Machine](https://img.shields.io/badge/Theme-Ghost%20in%20the%20Machine-F59E0B?style=for-the-badge)](https://dev.to/)
[![AI Model: Google Gemma](https://img.shields.io/badge/AI%20Model-Google%20Gemma%20(Ollama)-38BDF8?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](./LICENSE)

**Memory Lantern** is an emotional, elegant, and completely private digital remembrance garden designed for **Hacktoberfest 2026 (Week 4: Ghost in the Machine)**. Blending the warmth of *Día de los Muertos* ofrenda traditions with open-source artificial intelligence, it provides a quiet sanctuary to preserve cherished memories of loved ones, mentors, and pets, and illuminate those memories into heartfelt tribute letters using a locally running **Google Gemma** model.

---

## 📖 Table of Contents
- [1. Hacktoberfest 2026 Challenge Details](#1-hacktoberfest-2026-challenge-details)
- [2. Problem Statement](#2-problem-statement)
- [3. Project Features](#3-project-features)
- [4. Technology Stack](#4-technology-stack)
- [5. Architecture Overview](#5-architecture-overview)
- [6. Screenshots & Visual Previews](#6-screenshots--visual-previews)
- [7. Installation & Quickstart](#7-installation--quickstart)
  - [Prerequisites](#prerequisites)
  - [1. Ollama & Gemma Setup](#1-ollama--gemma-setup)
  - [2. Backend Setup (FastAPI)](#2-backend-setup-fastapi)
  - [3. Frontend Setup (React + Vite)](#3-frontend-setup-react--vite)
- [8. Running the Complete Application](#8-running-the-complete-application)
- [9. API Endpoints](#9-api-endpoints)
- [10. Why Open-Source AI Matters](#10-why-open-source-ai-matters)
- [11. Privacy & Security Considerations](#11-privacy--security-considerations)
- [12. Future Improvements](#12-future-improvements)
- [13. License](#13-license)

---

## 1. Hacktoberfest 2026 Challenge Details

- **Event:** Hacktoberfest 2026 Open-Source AI Challenge
- **Timeline:** Week 4 (October 2026)
- **Theme:** **Ghost in the Machine**
- **Theme Connection:** Re-interpreting Gilbert Ryle's philosophical paradox—how computing machinery can transcend cold calculation to become a compassionate, dignified vessel for human memory and love. Drawing on the cultural heritage of Halloween and *Día de los Muertos*, Memory Lantern turns binary circuits into glowing candlelight where memories remain alive.

---

## 2. Problem Statement

Modern digital memorials are frequently plagued by two deep flaws:
1. **Commercial Exploitation & Surveillance Cloud APIs:** Traditional platforms monetize grief, subject users to advertising banners, or feed private family memories into proprietary cloud LLMs to train third-party models.
2. **Cold, Impersonal Reductionism:** Digital archives often reduce rich human lives to sterile birth and death dates, neglecting the sensory textures—a grandmother's spiced hot chocolate, a father's favorite jazz record, or the distinct laughter that filled Sunday mornings.

**Memory Lantern solves this** by pairing 100% in-browser client-side storage (`LocalStorage`) with fully offline, local open-weight AI inference via **Google Gemma** and **Ollama**.

---

## 3. Project Features

- 🌿 **The Memory Garden:** A visual gallery of planted memories featuring search, relationship filtering, lit-candle indicators, detailed memory inspection modals, and full CRUD operations.
- 🕯️ **Virtual Ofrenda Altar:** A *Día de los Muertos* inspired remembrance space adorned with marigolds (*cempasúchil*), golden candlelight glows, realistic flickering animations, and interactive candle-lighting that persists locally.
- ✨ **AI Tribute Generator:** Powered by local Google Gemma via FastAPI, transforming sensory details into four formats:
  - **Heartfelt Remembrance Letter**
  - **Eulogy / Tribute Speech**
  - **Memory Quotes Collection**
  - **Ofrenda Blessing Message**
  - Selectable writing styles: *Heartfelt*, *Poetic*, *Simple and Personal*, *Nostalgic*.
- 🔒 **Zero Cloud Leakage:** All memories remain stored in browser `LocalStorage`. The AI connects only to your local Ollama port (`http://localhost:11434`).
- 🎵 **Acoustic Ambience:** Pure Web Audio API synthesized peaceful wind chimes and harmonic chords on candle illumination without external audio dependencies.
- 🚦 **Real-Time Model Status Badge:** Detects backend health and installed Ollama models with one-click switching and dynamic terminal setup guides.

---

## 4. Technology Stack

### Frontend
- **Framework:** React 19, Vite
- **Styling:** Tailwind CSS v4, Vanilla CSS keyframe animations
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

### Backend
- **Framework:** Python 3.10+, FastAPI
- **Data Validation:** Pydantic v2
- **Networking:** HTTPX (async client)
- **Server:** Uvicorn ASGI

### AI Engine
- **Model:** Google Gemma Open-Weights (`gemma3:1b` default, with automatic support for `gemma2:2b`)
- **Runtime:** Ollama Local Inference API (`/api/chat`)

### Storage
- **Persistence:** Client-side HTML5 LocalStorage (zero cloud database required)

---

## 5. Architecture Overview

```mermaid
graph TD
    User([User Browser]) <-->|React + Tailwind CSS| UI[Frontend UI / LocalStorage]
    UI <-->|REST API Proxy| API[FastAPI Backend - Port 8000]
    API <-->|Async HTTPX| Ollama[Ollama Local Runtime - Port 11434]
    Ollama <-->|Local Inference| Gemma[Google Gemma Open Weights]

    subgraph Privacy Perimeter (100% Local Machine)
        UI
        API
        Ollama
        Gemma
    end
```

---

## 6. Screenshots & Visual Previews

| The Memory Lantern Hero | The Virtual Ofrenda Altar |
| :---: | :---: |
| *(Hero section with golden lantern & theme)* | *(Interactive candles & marigold altar)* |

| The Memory Garden | Gemma AI Tribute Generator |
| :---: | :---: |
| *(Searchable memory cards & filters)* | *(Emotional letters & local model controls)* |

---

## 7. Installation & Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [Ollama](https://ollama.com/) installed and running locally

---

### 1. Ollama & Gemma Setup

1. Start the Ollama local daemon:
```bash
ollama serve
```

2. Pull the Gemma model:
```bash
ollama pull gemma3:1b
```
*(Or pull `gemma2:2b` if using 2B weights: `ollama pull gemma2:2b`)*

---

### 2. Backend Setup (FastAPI)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a Python virtual environment (optional but recommended):
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install required Python dependencies:
```bash
pip install -r requirements.txt
```

4. Verify your environment variables (`backend/.env`):
```env
HOST=0.0.0.0
PORT=8000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

5. Run unit tests to verify backend connectivity:
```bash
python test_api.py
```

6. Start the FastAPI server:
```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

---

### 3. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 8. Running the Complete Application

To run the full stack simultaneously:

| Service | Command | URL |
| :--- | :--- | :--- |
| **Ollama Daemon** | `ollama serve` | `http://localhost:11434` |
| **FastAPI Backend** | `python -m uvicorn main:app --port 8000` | `http://127.0.0.1:8000` |
| **Vite Frontend** | `npm run dev` | `http://localhost:5173` |

---

## 9. API Endpoints

### `GET /api/health`
Checks backend health and live Ollama connectivity.
- **Response:**
```json
{
  "status": "ok",
  "ollama_connected": true,
  "ollama_url": "http://localhost:11434",
  "active_model": "gemma3:1b",
  "installed_models": ["gemma2:2b", "gemma3:1b"],
  "model_ready": true,
  "message": "Ollama is connected and 'gemma3:1b' is ready."
}
```

### `GET /api/models`
Returns the list of all models downloaded and ready in Ollama.

### `POST /api/generate-tribute`
Generates an emotionally grounded remembrance tribute.
- **Request Body:**
```json
{
  "name": "Grandmother Elena",
  "relationship": "Grandmother",
  "description": "A warm soul who loved tending to her roses and hosting Sunday dinners.",
  "favorite_memories": "Baking fresh conchas while classic boleros played softly in the background.",
  "favorite_food": "Conchas and spiced hot chocolate",
  "favorite_music": "Mariachi and boleros",
  "special_qualities": "Gentle laughter and endless storytelling",
  "date_or_occasion": "Día de los Muertos",
  "style": "Heartfelt",
  "tribute_type": "letter",
  "model": "gemma3:1b"
}
```
- **Response:**
```json
{
  "tribute": "Dear Grandmother Elena,\n\nEvery time the autumn breeze carries the sweet scent of cinnamon...",
  "model": "gemma3:1b",
  "tribute_type": "letter",
  "style": "Heartfelt",
  "name": "Grandmother Elena"
}
```

---

## 10. Why Open-Source AI Matters

In bereavement and remembrance, technology must be held to the highest standard of ethics:

1. **Strict Grounding Without Hallucinations:** Grief is not a playground for fabricated stories. Memory Lantern instructs Gemma to rely strictly on the facts, songs, dishes, and qualities provided by the user.
2. **True Sovereignty:** Paid cloud APIs can deprecate models, alter terms of service, or train on user prompts. Open-weight models like Google Gemma belong to the user and run offline forever.
3. **No Financial Barrier to Remembrance:** Remembering a loved one should never be trapped behind a monthly SaaS subscription.

---

## 11. Privacy & Security Considerations

- **Client-Side Storage:** All memory entries, lit-candle flags, and saved tributes are saved in the user's browser `LocalStorage`.
- **Zero Third-Party Telemetry:** No analytics, tracking pixels, or third-party cookies are used.
- **Direct Local Network Communication:** The frontend communicates with the local FastAPI backend, which in turn queries Ollama over loopback (`127.0.0.1`). No memory data is transmitted over the public internet.

---

## 12. Future Improvements

- [ ] Export full garden memory book as a beautifully formatted PDF keepsake.
- [ ] Photo upload support stored locally as Base64/IndexedDB for offline altar portraits.
- [ ] Multi-language tribute generation (Spanish, Nahuatl, Japanese, and Portuguese).
- [ ] Calendar integration with automated remembrance candle reminders on anniversaries.

---

## 13. License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

*Dedicated to all those who came before us and the memories that continue to illuminate our path.*
