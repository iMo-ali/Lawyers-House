from pydantic import BaseModel, ConfigDict, computed_field
from datetime import datetime
from typing import Optional, List, Union
class FTask(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    case_id: int
    task_title: str
    task_description: str = None
    date_created: datetime = None
    date_completed: Optional[datetime] = None
    task_status: str

