from db.core import Base, engine
from sqlalchemy import Integer, String, Enum
from sqlalchemy.orm import Mapped, mapped_column
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