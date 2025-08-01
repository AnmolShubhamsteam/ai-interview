from sqlalchemy import Column, Integer, String

from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    avatar = Column(String)
    title = Column(String)
    company = Column(String)
    location = Column(String)
    bio = Column(String)
