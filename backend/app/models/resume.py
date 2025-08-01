from pydantic import BaseModel
from typing import List, Optional

class Experience(BaseModel):
    title: str
    company: str
    duration: str
    description: str

class Education(BaseModel):
    degree: str
    school: str
    year: str

class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str
    location: str

class ResumeData(BaseModel):
    personalInfo: PersonalInfo
    experience: List[Experience]
    education: List[Education]
    skills: List[str]
    summary: str

class QuestionsRequest(BaseModel):
    resumeSummary: str
    jobRole: str
