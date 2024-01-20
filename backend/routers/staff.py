from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from models_flask.lawyer import FLawyer
from models_db.client import Client
from models_db.secretary import Secretary
from typing import Annotated, Union
from utils import get_user_type, get_user_class
from pydantic import EmailStr
from sqlalchemy.orm import Session
from db.core import get_db
from routers.laywer import nonlawyer_access_exception
from models_db.lawyer import Lawyer, STAFF_STATUS

staff_router = APIRouter(prefix="/staff")

@staff_router.get("/staff-status", tags=["staff"])
async def get_staff_status(user:Annotated[Union[Lawyer, Secretary, Client], Depends(get_current_user)]):
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    return {
        "staff_status": [i.value for i in STAFF_STATUS]
    }
