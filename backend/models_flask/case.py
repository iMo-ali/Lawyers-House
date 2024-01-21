from pydantic import BaseModel, ConfigDict, computed_field
from datetime import datetime
from typing import Optional, List, Union
from models_flask.lawyer import FLawyer
from models_flask.client import FClient
class FCase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    case_id: int
    lawyer_id: Optional[int]
    client_id: int
    case_description: str = None
    date_created: datetime = None
    date_closed: Optional[datetime] = None
    case_status: str
    lawyer:Optional[FLawyer]
    client:Optional[FClient]

    @computed_field
    @property
    def client_name(self) -> str: 
        return f'{self.client.fname} {self.client.lname}'
    
    @computed_field
    @property
    def lawyer_name(self) -> Optional[str]: 
        if not self.lawyer:
            return None
        return f'{self.lawyer.fname} {self.lawyer.lname}'
    
    