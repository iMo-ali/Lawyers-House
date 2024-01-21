from db.core import Base, engine
from sqlalchemy.orm import Mapped, mapped_column, Session, relationship
from sqlalchemy import select, update, insert
from datetime import datetime
from typing import List
# from models_db.case import Case


class Client(Base):
    __tablename__ = "CLIENT"
    __table_args__ = {'extend_existing': True}
    id: Mapped[int] = mapped_column(primary_key=True, name="client_id")
    fname: Mapped[str]
    lname:Mapped[str]
    email:Mapped[str] = mapped_column(unique=True)
    password:Mapped[str] = mapped_column(name="password")
    date_registered:Mapped[datetime]
    cases:Mapped[List["Case"]] = relationship(back_populates='client', cascade="all, delete-orphan")

Base.metadata.create_all(bind = engine)

def select_all_clients(db:Session):
    return db.execute(select(Client).order_by(Client.date_registered)).scalars()

def select_client_by_id(db:Session, client_id:int):
    return db.execute(select(Client).where(Client.id == client_id)).scalar()

def select_client_by_email(db:Session, client_email:str):
    return db.execute(select(Client).where(Client.email == client_email)).scalar()

def insert_client(db:Session, fname:str, lname:str, email:str, password:str):
    try:
        client = Client(fname=fname,lname=lname, email=email, password=password,date_registered = datetime.now())
        db.add(client)
        db.commit()
        return True
    except Exception as e:
        return False

