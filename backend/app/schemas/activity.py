from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActivityCreate(BaseModel):
    title: str
    score: int
    type: str
    duration: str
    status: str

class ActivityOut(ActivityCreate):
    id: int
    date: datetime

    class Config:
        orm_mode = True
