from db.core import Base, engine
from sqlalchemy import  select, Enum, insert, update
from sqlalchemy.orm import Mapped, mapped_column, Session
import enum
from datetime import datetime
from models_db import STAFF_STATUS


class Lawyer_Type(enum.Enum):
    PARTNER = "PARTNER"
    PARALEGAL = "PARALEGAL"
class Lawyer(Base):
    __tablename__ = "LAWYER"
    id: Mapped[int] = mapped_column(primary_key=True, name="laywer_id")
    fname: Mapped[str]
    lname:Mapped[str]
    email:Mapped[str] = mapped_column(unique=True)
    password:Mapped[str] = mapped_column(name="password")
    date_registered:Mapped[datetime]
    lawyer_type:Mapped[Lawyer_Type] = mapped_column(Enum(Lawyer_Type))
    status:Mapped[STAFF_STATUS] = mapped_column(Enum(STAFF_STATUS))

Base.metadata.create_all(bind = engine)
    
def is_valid_partner(db:Session, username:str):
    lawyer = get_lawyer_by_username(db, username)
    if not lawyer:
        return False
    return is_partner(lawyer)
def get_lawyer_by_username(db:Session, username):
    lawyer: Lawyer = db.execute(select(Lawyer).where(Lawyer.email == username)).scalar()
    return lawyer

def is_partner(lawyer:Lawyer):
    # print(lawyer.lawyer_type, lawyer.lawyer_type == Lawyer_Type.PARTNER)
    return lawyer.lawyer_type == Lawyer_Type.PARTNER

def select_all_lawyers(db:Session):
    return db.execute(select(Lawyer).order_by(Lawyer.lawyer_type)).scalars()

def select_lawyer_by_id(db:Session, lawyer_id:int):
    return db.execute(select(Lawyer).where(Lawyer.id == lawyer_id)).scalar()

def select_lawyer_by_email(db:Session, lawyer_email:str):
    return db.execute(select(Lawyer).where(Lawyer.email == lawyer_email)).scalar()

def insert_lawyer(db:Session, fname:str, lname:str, email:str, password:str, lawyer_type:Lawyer_Type, staff_status:STAFF_STATUS):
    try:
        lawyer = Lawyer(fname=fname,lname=lname, email=email, password=password,date_registered = datetime.now(), lawyer_type=lawyer_type, status=staff_status)
        db.add(lawyer)
        db.commit()
        return True
    except Exception as e:
        return False

def update_lawyer_status(db:Session, id:int ,staff_status:STAFF_STATUS):
    try:
        lawyer = db.execute(select(Lawyer).where(Lawyer.id == id)).scalar()
        if not lawyer:
            return False
        db.execute(update(Lawyer).where(Lawyer.id ==id).values(status = staff_status))
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False
def update_lawyer_row(db:Session, lawyer_id, fname, lname, email, password, lawyer_type, staff_status):
    try:
        db.execute(update(Lawyer).where(Lawyer.id==lawyer_id).values(fname=fname, lname=lname, email=email, password=password, lawyer_type=lawyer_type, status=staff_status))
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False