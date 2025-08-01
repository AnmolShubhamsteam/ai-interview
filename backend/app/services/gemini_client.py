from typing import List

import google.generativeai as genai

from ..config import get_settings

settings = get_settings()

genai.configure(api_key=settings.gemini_api_key)

model = genai.GenerativeModel('gemini-pro')

async def analyze_resume(text: str) -> dict:
    prompt = (
        "Extract personal info, experience, education, skills and summary from the following resume text and return as JSON with keys 'personalInfo', 'experience', 'education', 'skills', 'summary'.\n"
        f"Resume:\n{text}"
    )
    response = model.generate_content(prompt)
    return response.candidates[0].text

async def generate_questions(resume_summary: str, job_role: str) -> List[str]:
    prompt = (
        "Generate 5 interview questions for the following job role based on the candidate resume summary."
        f"\nJob Role: {job_role}\nResume Summary: {resume_summary}"
    )
    response = model.generate_content(prompt)
    return response.candidates[0].text
