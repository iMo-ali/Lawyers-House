from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from models_flask.lawyer import FLawyer
from models_db.lawyer import Lawyer, is_valid_partner, select_all_lawyers, select_lawyer_by_id, select_lawyer_by_email, STAFF_STATUS, Lawyer_Type, insert_lawyer
from models_db.client import Client
from models_db.secretary import Secretary
from typing import Annotated, Union
from utils import get_user_type, get_user_class
from pydantic import EmailStr
from sqlalchemy.orm import Session
from db.core import get_db
router = APIRouter(prefix="/lawyers")
nonpartner_access_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Partners only, Access Not Allowed",)
nonlawyer_access_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Lawyers only, Access Not Allowed",)

@router.get("/all", tags=["lawyers"])
async def get_all_lawyers(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):#(db:Annotated[Session, Depends(get_db)], username: Annotated[EmailStr, Depends(real_get_current_user)]):
    username = user.email
    if not isinstance(user, Lawyer):
        raise  nonlawyer_access_exception
    if not is_valid_partner(db, username):
        raise nonpartner_access_exception
    return [FLawyer(**lawyer.__dict__) for lawyer in select_all_lawyers(db)]


@router.post("/add", tags=["lawyers"])
async def post_lawyer(fname:Annotated[str, Form()], lname:Annotated[str, Form()], email:Annotated[EmailStr, Form()], password:Annotated[str, Form()], lawyer_type:Annotated[Lawyer_Type, Form()], staff_status:Annotated[STAFF_STATUS, Form()],user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    if not is_valid_partner(db, user.email):
        raise nonpartner_access_exception
    inserted = insert_lawyer(db, fname, lname, email, password, lawyer_type, staff_status)
    if not inserted:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, "The email is already taken")
    
@router.get("/add", tags=["lawyers"])
async def get_lawyer_types(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db: Annotated[Session, Depends(get_db)]):
    if not is_valid_partner(db, user.email):
        raise nonpartner_access_exception
    return {"lawyer_types": [t.value for t in Lawyer_Type]}


@router.get("/{lawyer_id}", tags=["lawyers"])
async def get_lawyer_by_id(lawyer_id:int, user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    # allow lawyers to view each other
    if isinstance(user, Lawyer):
        lawyer = select_lawyer_by_id(db, lawyer_id)
        if not lawyer:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "No lawyer with this id")
        else:
            return FLawyer(**lawyer.__dict__)
    # allow clients to only view them if they are handelling their cases
    # don't allow secretary to view lawyers
    else:
        raise nonlawyer_access_exception
    

