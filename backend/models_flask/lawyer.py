from pydantic import BaseModel, EmailStr, ConfigDict
from models_db.lawyer import Lawyer_Type
from typing import Optional, List
from datetime import datetime
class FLawyer(BaseModel):
    model_config = ConfigDict(from_attributes=True) 
    id: int
    fname:str
    lname:str
    email:EmailStr
    #password: str 
    date_registered:datetime
    lawyer_type: str
    status: str