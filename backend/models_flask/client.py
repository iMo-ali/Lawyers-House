from datetime import datetime
from pydantic import BaseModel
class FClient(BaseModel):
    id: int 
    fname: str
    lname:str
    email:str
    date_registered:datetime

