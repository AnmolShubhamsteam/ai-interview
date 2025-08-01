from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from ..database import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String)
    score = Column(Integer)
    date = Column(DateTime, default=datetime.utcnow)
    type = Column(String)
    duration = Column(String)
    status = Column(String)

    user = relationship("User", backref="activities")
