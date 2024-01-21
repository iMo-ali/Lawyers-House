from fastapi import APIRouter, Depends, HTTPException,status, Form
from auth.router import get_current_user
from models_flask.task import FTask
from models_db.task import (Task, Task_Status, insert_task,
                             select_tasks_by_case_id, delete_task_by_id,
                             update_task_by_id)
from models_db.client import Client
from models_db.secretary import Secretary
from models_db.lawyer import Lawyer
from typing import Annotated, Union
from sqlalchemy.orm import Session
from db.core import get_db
from typing import List
from datetime import datetime
from routers.laywer import nonlawyer_access_exception
tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])

@tasks_router.post("/add")
async def create_task(db:Annotated[Session, Depends(get_db)],
                      user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)],
                      case_id: Annotated[int, Form()],
                        task_title: Annotated[str, Form()], 
                        task_description: Annotated[str, Form()], 
                        task_status:Annotated[Task_Status, Form()], 
                        date_created:Annotated[datetime, Form()]=None,
                        date_completed:Annotated[datetime, Form()]=None ):
    
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    res = insert_task(db=db, case_id=case_id, task_title=task_title, task_description=task_description, task_status=task_status, date_created=date_created, date_completed=date_completed)
    if res:
        return True
    else:
        return False

@tasks_router.put("/update")
async def create_task(db:Annotated[Session, Depends(get_db)],
                      user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)],
                      task_id: Annotated[int, Form()],
                        task_title: Annotated[str, Form()], 
                        task_description: Annotated[str, Form()], 
                        task_status:Annotated[Task_Status, Form()], 
                        date_created:Annotated[datetime, Form()]=None,
                        date_completed:Annotated[datetime, Form()]=None ):
    
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    res = update_task_by_id(db=db, task_id=task_id, task_title=task_title, task_description=task_description, task_status=task_status, date_created=date_created, date_completed=date_completed)
    if res:
        return True
    else:
        return False
# get tasks of a cases, access: lawyers and partners
@tasks_router.get("/get-case-tasks")
async def get_case_tasks(case_id:int, db: Annotated[Session, Depends(get_db)], user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)]):
    return [FTask.model_validate(task) for task in select_tasks_by_case_id(db, case_id)]

@tasks_router.delete("/delete")
def delete_task(task_id:int, db: Annotated[Session, Depends(get_db)], user:Annotated[Union[Lawyer, Client, Secretary], Depends(get_current_user)]):
    if not isinstance(user, Lawyer):
        raise nonlawyer_access_exception
    res = delete_task_by_id(db, task_id)
    if res:
        return True
    else:
        return False
