from db.core import Base, engine
from sqlalchemy import  select, Enum, insert, update, ForeignKey, Integer,Text, Date
from sqlalchemy.orm import Mapped, mapped_column, Session, relationship
import enum
from datetime import datetime
from models_db.lawyer import Lawyer
from models_db.client import Client

class Case_Status(enum.Enum):
    NOT_ASSIGNED = "NOT_ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED =  "COMPLETED"
    CANCELLED = "CANCELLED"

class Case(Base):
    __tablename__ = 'CASE'
    __table_args__ = {'extend_existing': True}
    case_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    lawyer_id: Mapped[int] = mapped_column(Integer, ForeignKey('LAWYER.laywer_id'), nullable=True)
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey('CLIENT.client_id'))
    case_description: Mapped[str] = mapped_column(nullable=False)
    date_created: Mapped[datetime] = mapped_column(nullable=False)
    date_closed: Mapped[datetime] = mapped_column(nullable=True)
    case_status: Mapped[Case_Status] = mapped_column(Enum(Case_Status))
    lawyer: Mapped["Lawyer"] = relationship(back_populates="cases")
    client: Mapped["Client"] = relationship(back_populates="cases")

Base.metadata.create_all(bind=engine)

def insert_case(db, client_id, case_description, case_status, lawyer_id= None, date_created= None,  date_closed=None ):
    date_created = datetime.now() if date_created is None else date_created
    case = Case(lawyer_id=lawyer_id, client_id=client_id, case_description=case_description, case_status=case_status, date_created=date_created, date_closed=date_closed)
    try:
            
        db.add(case)
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
def select_all_cases(db:Session):
    try:
        return db.execute(select(Case)).scalars()
    except Exception as e:
        print(e)
        return []
    
def select_cases_by_lawyer_id(db:Session, lawyer_id):
    try:
        cases = db.execute(select(Case).where(Case.lawyer_id==lawyer_id)).scalars()
        return cases
    except Exception as e:
        print(e)
        return []