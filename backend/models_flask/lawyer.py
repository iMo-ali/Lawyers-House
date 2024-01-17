from pydantic import BaseModel, EmailStr
from models_db.lawyer import Lawyer_Type
from typing import Optional
from datetime import datetime
class FLawyer(BaseModel):
    id: int
    fname:str
    lname:str
    email:EmailStr
    #password: str 
    date_registered:datetime
    lawyer_type: str
    status: str