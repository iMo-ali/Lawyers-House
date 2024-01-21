from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from routers.case import nonstaff_access_exception
from models_flask.secretary import FSecretary
from models_db.lawyer import (Lawyer, is_valid_partner, STAFF_STATUS)
from models_db.secretary import (select_all_secretaries, select_secretary_by_id, 
                                insert_secretary, update_secretary_status, update_secretary_row)
from models_db.client import Client
from models_db.secretary import Secretary
from typing import Annotated, Union
from utils import get_user_type, get_user_class
from pydantic import EmailStr
from sqlalchemy.orm import Session
from db.core import get_db
from typing import List
from routers.laywer import nonlawyer_access_exception

secretaries_router = APIRouter(prefix="/secretaries", tags=["secretaries"])

@secretaries_router.get("/all", response_model=List[FSecretary])
async def get_all_secretaries(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):#(db:Annotated[Session, Depends(get_db)], username: Annotated[EmailStr, Depends(real_get_current_user)]):
    username = user.email
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    #return [FSecretary(**secretary.__dict__) for secretary in select_all_secretaries(db)]
    return [FSecretary.model_validate(secretary) for secretary in select_all_secretaries(db)]


@secretaries_router.post("/add", tags=["secretaries"])
async def post_secretary(fname:Annotated[str, Form()], lname:Annotated[str, Form()], email:Annotated[EmailStr, Form()], password:Annotated[str, Form()], staff_status:Annotated[STAFF_STATUS, Form()],user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    inserted = insert_secretary(db, fname, lname, email, password, staff_status)
    if not inserted:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, "The email is already taken")
    return True
    

@secretaries_router.put("/change-status", tags=["secretaries"])
def change_secretary_status(id: Annotated[int, Form()], user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)], staff_status:Annotated[STAFF_STATUS, Form()], db:Annotated[Session, Depends(get_db)]):
    # only partners change the secretaries statuses
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    if update_secretary_status(db, id, staff_status):
        return True
    else:
        return False


@secretaries_router.put("/update-secretary", tags=["secretaries"])
def update_secretary_information(  user:Annotated[Union[Lawyer,Client, Secretary],
                                Depends(get_current_user)],
                                db:Annotated[Session, Depends(get_db)],
                                secretary_id:Annotated[int, Form()],
                                fname:Annotated[str, Form()],
                                lname:Annotated[str, Form()],
                                email:Annotated[EmailStr, Form()],
                                password:Annotated[str, Form()],
                                staff_status:Annotated[STAFF_STATUS, Form()]):
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    res = update_secretary_row(db, secretary_id, fname, lname, email, password, staff_status)
    if res:
        return True
    else:
        return False

@secretaries_router.get("/{secretary_id}", tags=["secretaries"])
async def get_secretary_by_id(secretary_id:int, user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    # allow secretaries to view each other
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception

    secretary = select_secretary_by_id(db, secretary_id)
    if not secretary:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No secretary with this id")
    else:
        return FSecretary(**secretary.__dict__)
    