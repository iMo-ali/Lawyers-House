from db.core import Base, engine
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime



class Client(Base):
    __tablename__ = "CLIENT"
    id: Mapped[int] = mapped_column(primary_key=True, name="client_id")
    fname: Mapped[str]
    lname:Mapped[str]
    email:Mapped[str] = mapped_column(unique=True)
    password:Mapped[str] = mapped_column(name="password")
    date_registered:Mapped[datetime]

Base.metadata.create_all(bind = engine)