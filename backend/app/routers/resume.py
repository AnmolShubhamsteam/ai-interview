from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import List
import json

from ..services.resume_parser import extract_resume_text
from ..services.gemini_client import analyze_resume, generate_questions
from ..models.resume import ResumeData, QuestionsRequest

router = APIRouter(prefix="/resume", tags=["resume"])

@router.post("/parse", response_model=ResumeData)
async def parse_resume(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = await extract_resume_text(file_bytes, file.filename)
    if not text:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    analysis = await analyze_resume(text)
    try:
        return ResumeData(**json.loads(analysis))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to parse resume")

@router.post("/questions", response_model=List[str])
async def questions(req: QuestionsRequest):
    questions_text = await generate_questions(req.resumeSummary, req.jobRole)
    try:
        return json.loads(questions_text)
    except Exception:
        # fallback: split by lines
        return [q.strip("- ") for q in questions_text.splitlines() if q.strip()]
