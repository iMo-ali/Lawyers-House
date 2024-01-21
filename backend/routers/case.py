from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from models_flask.case import FCase
from models_db.case import (Case, Case_Status, insert_case, select_all_cases, select_cases_by_lawyer_id)
from models_db.lawyer import (Lawyer, select_lawyer_names)
from models_db.client import Client
from models_db.secretary import Secretary
from models_db.lawyer import Lawyer
from typing import Annotated, Union
from utils import get_user_type, get_user_class
from pydantic import EmailStr
from sqlalchemy.orm import Session
from db.core import get_db
from typing import List
from datetime import datetime
cases_router = APIRouter(prefix="/cases", tags=["cases"])
nonstaff_access_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Access denied, Only law firm staff are allowed to acces."
)
@cases_router.get("/case_status")
async def get_case_statuses(user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)]):
    if isinstance(user, Client):
        raise nonstaff_access_exception
    return {"case_status": [s.value for s in Case_Status]}

@cases_router.post("/add")
async def create_case(db:Annotated[Session, Depends(get_db)],
                      user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)],
                      client_id: Annotated[int, Form()],
                        case_description: Annotated[str, Form()], 
                        case_status:Annotated[Case_Status, Form()], 
                        lawyer_id:Annotated[int, Form()]= None,
                        date_created:Annotated[datetime, Form()]=None,
                        date_closed:Annotated[datetime, Form()]=None ):
    
    if isinstance(user, Client):
        raise nonstaff_access_exception
    res = insert_case(db=db, client_id=client_id, case_description=case_description, case_status=case_status, lawyer_id=lawyer_id, date_created=date_created, date_closed=date_closed)
    if res:
        return True
    else:
        return False
# get all cases
@cases_router.get("/all")
async def get_all_cases(db: Annotated[Session, Depends(get_db)],
                        user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)] ):
    if isinstance(user, Client):
        raise nonstaff_access_exception
    return [FCase.model_validate(case) for case in select_all_cases(db)]

# get cases of a lawyer, access: the said lawyer or a partner
@cases_router.get("/get-lawyer-cases")
async def get_lawyer_cases(lawyer_id:int, db: Annotated[Session, Depends(get_db)]):
    return [FCase.model_validate(case) for case in select_cases_by_lawyer_id(db, lawyer_id)]

# get cases of client
# form to edit a case
