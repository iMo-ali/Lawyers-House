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
from routers.laywer import nonlawyer_access_exception, nonpartner_access_exception
from models_db.lawyer import Lawyer, STAFF_STATUS
from models_db.client import *
from models_db.lawyer import *
from models_flask.client import FClient
clients_router = APIRouter(prefix="/clients")

nonpartner_nonsecretary_access_exception = HTTPException(
    status.HTTP_401_UNAUTHORIZED,
    detail="Partners and Secretary only, Access not allowed"
)

staff_access_exception = HTTPException(
    status.HTTP_401_UNAUTHORIZED,
    detail="Staff only, Access not allowed"
)
@clients_router.get("/all", tags=["clients"])
async def get_all_clients(user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):#(db:Annotated[Session, Depends(get_db)], username: Annotated[EmailStr, Depends(real_get_current_user)]):
    username = user.email
    if not is_valid_partner(db, username) and not isinstance(user, Secretary):
        raise nonpartner_nonsecretary_access_exception
    return [FClient(**client.__dict__) for client in select_all_clients(db)]


@clients_router.post("/add", tags=["clients"])
async def post_client(fname:Annotated[str, Form()], lname:Annotated[str, Form()], email:Annotated[EmailStr, Form()], password:Annotated[str, Form()], user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    if not is_valid_partner(db, user.email) and not isinstance(user, Secretary):
        raise nonpartner_nonsecretary_access_exception
    inserted = insert_client(db, fname, lname, email, password)
    if not inserted:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, "The email is already taken")
    return True


@clients_router.get("/{client_id}", tags=["clients"])
async def get_client_by_id(client_id:int, user:Annotated[Union[Lawyer,Client, Secretary], Depends(get_current_user)], db:Annotated[Session, Depends(get_db)]):
    # allow clients to view each other
    if isinstance(user, Client):
        raise staff_access_exception

    client = select_client_by_id(db, client_id)
    if not client:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No client with this id")
    else:
        return FClient(**client.__dict__)
    # allow clients to only view them if they are handelling their cases
    # don't allow secretary to view clients

