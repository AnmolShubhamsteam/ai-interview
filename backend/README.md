# AI Interview Backend

This directory contains a FastAPI server used by the front‑end. The server exposes endpoints for authentication, profile management, dashboard activity, and for parsing resumes and generating interview questions with Google's Gemini model.

## Setup

1. Create a Python virtual environment (optional but recommended).
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Provide a `.env` file with your Gemini API key and a secret key for JWTs:

```
GEMINI_API_KEY=your-key-here
SECRET_KEY=super-secret
```

4. Start the server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.
