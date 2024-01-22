from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from routers.case import nonstaff_access_exception
from models_flask.lawyer import FLawyer
from models_db.lawyer import (Lawyer, is_valid_partner, select_all_lawyers,
                               select_lawyer_by_id, select_lawyer_by_email, 
                               STAFF_STATUS, Lawyer_Type, insert_lawyer, 
                               update_lawyer_status, update_lawyer_row, select_lawyer_names)
from models_db.client import Client
from models_db.secretary import Secretary
from typing import Annotated, Union
from utils import get_user_type, get_user_class
from pydantic import EmailStr
from sqlalchemy.orm import Session
from db.core import get_db
from typing import List
router = APIRouter(prefix="/lawyers", tags=["lawyers"])
nonpartner_access_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Partners only, Access Not Allowed",)
nonlawyer_access_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Lawyers only, Access Not Allowed",)

@router.get("/all", tags=["lawyers"], response_model=List[FLawyer])
async def get_all_lawyers(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):#(db:Annotated[Session, Depends(get_db)], username: Annotated[EmailStr, Depends(real_get_current_user)]):
    username = user.email
    if not isinstance(user, Lawyer):
        raise  nonlawyer_access_exception
    # if not is_valid_partner(db, username):
    #     raise nonpartner_access_exception
    #return [FLawyer(**lawyer.__dict__) for lawyer in select_all_lawyers(db)]
    return [FLawyer.model_validate(lawyer) for lawyer in select_all_lawyers(db)]


@router.post("/add", tags=["lawyers"])
async def post_lawyer(fname:Annotated[str, Form()], lname:Annotated[str, Form()], email:Annotated[EmailStr, Form()], password:Annotated[str, Form()], lawyer_type:Annotated[Lawyer_Type, Form()], staff_status:Annotated[STAFF_STATUS, Form()],user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    if not is_valid_partner(db, user.email):
        raise nonpartner_access_exception
    inserted = insert_lawyer(db, fname, lname, email, password, lawyer_type, staff_status)
    if not inserted:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, "The email is already taken")
    return True
    
@router.get("/lawyer_types", tags=["lawyers"])
async def get_lawyer_types(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db: Annotated[Session, Depends(get_db)]):
    if not is_valid_partner(db, user.email):
        raise nonpartner_access_exception
    return {"lawyer_types": [t.value for t in Lawyer_Type]}

@router.put("/change-status", tags=["lawyers"])
def change_lawyer_status(id: Annotated[int, Form()], user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)], staff_status:Annotated[STAFF_STATUS, Form()], db:Annotated[Session, Depends(get_db)]):
    # only partners change the lawyers statuses
    if not is_valid_partner(db, user.email):
        raise nonpartner_access_exception
    if update_lawyer_status(db, id, staff_status):
        return True
    else:
        return False

    
@router.get("/get-names")
def get_all_lawyer_names(db:Annotated[Session, Depends(get_db)],
                         user:Annotated[Union[Lawyer,Client, Secretary],
                                Depends(get_current_user)]):
    if isinstance(user, Client):
        raise nonstaff_access_exception
    return select_lawyer_names(db)

@router.put("/update-lawyer", tags=["lawyers"])
def update_lawyer_information(  user:Annotated[Union[Lawyer,Client, Secretary],
                                Depends(get_current_user)],
                                db:Annotated[Session, Depends(get_db)],
                                lawyer_id:Annotated[int, Form()],
                                fname:Annotated[str, Form()],
                                lname:Annotated[str, Form()],
                                email:Annotated[EmailStr, Form()],
                                password:Annotated[str, Form()],
                                lawyer_type:Annotated[Lawyer_Type, Form()],
                                staff_status:Annotated[STAFF_STATUS, Form()]):
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    res = update_lawyer_row(db, lawyer_id, fname, lname, email, password, lawyer_type, staff_status)
    if res:
        return True
    else:
        return False

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