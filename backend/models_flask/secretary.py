from pydantic import BaseModel
from datetime import datetime
class FSecretary(BaseModel):
    id: int  
    fname: str
    lname:str
    email:str
    password:str  
    date_registered:datetime
    status:str