from db.core import Base, engine
from sqlalchemy import  select, Enum, insert, update, ForeignKey, Integer,Text, Date, delete
from sqlalchemy.orm import Mapped, mapped_column, Session, relationship
import enum
from datetime import datetime

class Task_Status(enum.Enum):
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED =  "COMPLETED"
    CANCELLED = "CANCELLED"

class Task(Base):
    __tablename__ = 'TASK'
    __table_args__ = {'extend_existing': True}
    id: Mapped[int] = mapped_column(Integer, primary_key=True, name="task_id")
    case_id: Mapped[int] = mapped_column(Integer, ForeignKey('CASE.case_id'))
    task_title: Mapped[str] = mapped_column(nullable=False)
    task_description: Mapped[str] = mapped_column(nullable=True)
    date_created: Mapped[datetime] = mapped_column(nullable=False)
    date_completed: Mapped[datetime] = mapped_column(nullable=True)
    task_status: Mapped[Task_Status] = mapped_column(Enum(Task_Status))
    case: Mapped["Case"] = relationship(back_populates="tasks")


Base.metadata.create_all(bind = engine)


def insert_task(db, case_id, task_title, task_description, task_status, date_created= None,  date_completed=None ):
    date_created = datetime.now() if date_created is None else date_created
    task = Task(case_id=case_id, task_title=task_title, task_description=task_description, task_status=task_status, date_created=date_created, date_completed=date_completed)
    try: 
        db.add(task)
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
def select_all_tasks(db:Session):
    try:
        return db.execute(select(Task)).scalars()
    except Exception as e:
        print(e)
        return []
    
def select_tasks_by_case_id(db:Session, case_id):
    try:
        tasks = db.execute(select(Task).where(Task.case_id==case_id)).scalars()
        return tasks
    except Exception as e:
        print(e)
        return []

def update_task_by_id(db:Session, task_id, task_title, task_description, task_status, date_created,  date_completed):
    try:
        db.execute(update(Task).where(Task.id==task_id).values(
            task_title=task_title, task_description=task_description, 
            task_status=task_status, date_created=date_created, 
            date_completed=date_completed))
        
    except Exception as e:
        print(e)
        return False
    pass

def delete_task_by_id(db:Session, task_id):
    try:
        db.execute(delete(Task).where(Task.id==task_id))
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False
    