from datetime import datetime
from pydantic import BaseModel, ConfigDict
class FClient(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int 
    fname: str
    lname:str
    email:str
    date_registered:datetime

