# Day 01 — Initial Setup & Environment Configuration

Welcome to **Day 01** of the 10-Week AI Engineer Journey! Today's focus is configuring a production-ready development environment, acquiring API credentials, and initializing version control.

---

## 🎯 Objectives for Day 01

1. **Python Environment**: Verify Python 3.11+ and set up virtual environment management with `uv`.
2. **Version Control**: Configure Git identity and link repository to GitHub.
3. **LLM Provider API**: Obtain Groq API credentials for high-speed LLM inference.
4. **Vector Database Credentials**: Setup Qdrant API key and endpoint.
5. **Secrets Management**: Store credentials securely in `.env` and verify `.gitignore`.

---

## 🛠️ Step-by-Step Setup Guide

### 1. Python & Virtual Environment (`uv`)

We use `uv` for fast, reproducible Python package and environment management.

```bash
# Verify Python installation (Python 3.11+ recommended)
python3 --version

# Verify uv package manager
uv --version

# Create virtual environment (.venv)
uv venv

# Activate virtual environment
# On macOS / Linux:
source .venv/bin/activate

# On Windows:
# .venv\Scripts\activate
```

---

### 2. Git & GitHub Setup

Ensure your local repository is initialized and linked to GitHub.

```bash
# Configure Git global user identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check Git status
git status
```

---

### 3. Groq API Key Setup

Groq provides fast, free-tier access to open models like Llama 3.3.

1. Navigate to [console.groq.com](https://console.groq.com).
2. Sign in and go to **API Keys**.
3. Create a new key and add it to your `.env` file as `GROQ_API_KEY`.

---

### 4. Qdrant Vector Database Setup

Qdrant will serve as our primary vector store for RAG applications.

1. Create a free account at [cloud.qdrant.io](https://cloud.qdrant.io) (or run Qdrant locally via Docker).
2. Create a cluster and copy the **Cluster Endpoint URL** and **API Key**.
3. Add them to `.env`:
   - `QDRANT_URL`
   - `QDRANT_API_KEY`

---

### 5. Local Environment Configuration (`.env`)

Create `.env` in the root directory (never commit this file to Git):

```env
# AI Provider API Keys
GROQ_API_KEY=gsk_your_groq_api_key_here
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Vector DB Credentials
QDRANT_URL=https://your-cluster-id.cloud.qdrant.tech:6333
QDRANT_API_KEY=your_qdrant_api_key_here
```

Ensure `.gitignore` contains:
```gitignore
.env
.env.*
!.env.example
.venv/
__pycache__/
```

---

## 📋 Verification Checklist

- [x] Python 3.11+ installed & `.venv` activated.
- [x] Git configured and synced with GitHub.
- [x] `GROQ_API_KEY` configured in `.env`.
- [x] `QDRANT_URL` and `QDRANT_API_KEY` configured in `.env`.
- [x] `.env` excluded from version control via `.gitignore`.
