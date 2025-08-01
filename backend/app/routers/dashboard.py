from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.activity import Activity
from ..models.user import User
from ..schemas.activity import ActivityCreate, ActivityOut
from .profile import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/activity", response_model=list[ActivityOut])
def list_activity(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Activity).filter(Activity.user_id == current_user.id).all()

@router.post("/activity", response_model=ActivityOut)
def add_activity(
    activity_in: ActivityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    activity = Activity(user_id=current_user.id, **activity_in.dict())
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity
