from db.core import Base, engine
from sqlalchemy import Integer, String, Enum, select, insert, update
from sqlalchemy.orm import Mapped, mapped_column, Session
import enum
from datetime import datetime
from models_db import STAFF_STATUS


class Secretary(Base):
    __tablename__ = "SECRETARY"
    id: Mapped[int] = mapped_column(primary_key=True, name="secretary_id")
    fname: Mapped[str]
    lname:Mapped[str]
    email:Mapped[str] = mapped_column(unique=True)
    password:Mapped[str] = mapped_column(name="password")
    date_registered:Mapped[datetime]
    status:Mapped[STAFF_STATUS]

Base.metadata.create_all(bind = engine)

def select_all_secretaries(db:Session):
    return db.execute(select(Secretary).order_by(Secretary.status)).scalars()

def select_secretary_by_id(db:Session, secretary_id:int):
    return db.execute(select(Secretary).where(Secretary.id == secretary_id)).scalar()

def select_secretary_by_email(db:Session, secretary_email:str):
    return db.execute(select(Secretary).where(Secretary.email == secretary_email)).scalar()

def insert_secretary(db:Session, fname:str, lname:str, email:str, password:str, staff_status:STAFF_STATUS):
    try:
        secretary = Secretary(fname=fname,lname=lname, email=email, password=password,date_registered = datetime.now(), status=staff_status)
        db.add(secretary)
        db.commit()
        return True
    except Exception as e:
        return False

def update_secretary_status(db:Session, id:int ,staff_status:STAFF_STATUS):
    try:
        secretary = db.execute(select(Secretary).where(Secretary.id == id)).scalar()
        if not secretary:
            return False
        db.execute(update(Secretary).where(Secretary.id ==id).values(status = staff_status))
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False

def update_secretary_row(db:Session, secretary_id, fname, lname, email, password, staff_status):
    try:
        db.execute(update(Secretary).where(Secretary.id==secretary_id).values(fname=fname, lname=lname, email=email, password=password, status=staff_status))
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False