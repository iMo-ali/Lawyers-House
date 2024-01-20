from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Union

pwd_context = CryptContext(schemes=["bcrypt"])


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)