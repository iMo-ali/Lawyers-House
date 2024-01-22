from pydantic import BaseModel, ConfigDict
from datetime import datetime
class FSecretary(BaseModel):
    model_config = ConfigDict(from_attributes=True) 
    id: int  
    fname: str
    lname:str
    email:str
    password:str  
    date_registered:datetime
    status:str