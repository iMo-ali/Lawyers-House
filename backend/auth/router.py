from fastapi import Response, APIRouter, Depends, HTTPException, status, Form
from fastapi.security import  APIKeyCookie
from datetime import datetime, timedelta, timezone, tzinfo
from typing import Annotated, Union
import os
from jose import JWTError, jwt
from pydantic import EmailStr
from db.core import get_db
import utils 
from auth.security import verify_password, get_password_hash, Token, TokenData
from auth.config import *
from sqlalchemy.orm import Session
from sqlalchemy import select
from models_db.lawyer import Lawyer, Lawyer_Type
from models_db.client import Client
from models_db.secretary import Secretary

# fake_users_db = {
#     "lawyer": [
#                 ("hazem@lawyer.com","pass"),
#                ("ali@lawyer.com", "pass")
#                ],
#     "client": [("fahd@client.com", "pass"),
#                ("joe@client.com", "pass")
#     ],
#     "secretary": [("lary@secretary.com", "pass"),
#                ("hary@secretary.com", "pass")
#     ],
#     "document":[(1, "document-templates/poa.pdf", "client-lary")]
# }
# # {
#     "johndoe": {
#         "username": "johndoe",
#         "full_name": "John Doe",
#         "email": "johndoe@example.com",
#         "hashed_password": "$2b$12$jnTny5BYZBK/BKLRoIzK3.eM9O6R1dF86sXDH/ObiWn6/bb8Q93UG",
#         "disabled": False,
#     }
# }
cookie_scheme = APIKeyCookie(name=os.getenv("COOKIE_NAME"))
router = APIRouter(prefix="/auth", tags=["auth"])

#dummy class
# class User(BaseModel):
#     username: str
#     email: Union[str, None] = None
#     full_name: Union[str, None] = None
#     disabled: Union[bool, None] = None

# #dummy class
# class UserInDB(User):
#     hashed_password: str


# def get_user(db, username: str):
#     user_type = utils.get_user_type(username)
#     info =  utils.get_user(username, db)
#     if info:
#         return UserInDB(username=info[0], hashed_password=info[1])
#     else:
#         return None
credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )  
session_expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session is expired, please login again",
    )  
def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(cookie_scheme)], db: Annotated[Session, Depends(get_db)], response:Response):
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_time = datetime.fromtimestamp(payload.get("exp"))
        if datetime.now() > exp_time: # session expired
            response.delete_cookie(COOKIE_NAME)
            raise session_expired_exception
        
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user_class= utils.get_user_class(username)
    if not user_class:
        return False
    user = db.execute(select(user_class).where(user_class.email == username)).scalar()
    if not user:
        return credentials_exception
    return user


def authenticate_user(db:Session, username, password):
    user_class= utils.get_user_class(username)
    if not user_class:
        return False
    user = db.execute(select(user_class).where(user_class.email == username)).scalar()
    if not user:
        return False
    print(password, user.password, password == user.password, sep='\n')
    if password != user.password:
        return False
    return user
@router.post("/token")
async def login_for_access_token(
    response:Response,
    username: Annotated[EmailStr, Form()],
    password: Annotated[str, Form()],
    db:Annotated[Session, Depends(get_db)]
):
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    is_partner = isinstance(user, Lawyer) and user.lawyer_type == Lawyer_Type.PARTNER
    data= {
           "sub": user.email,
           "is_lawyer":isinstance(user, Lawyer),
           "is_partner":is_partner,
           "exp": datetime.timestamp(datetime.now()+access_token_expires)
           }
    access_token = create_access_token(data=data)

    response.delete_cookie(COOKIE_NAME)
    response.set_cookie(COOKIE_NAME, access_token, expires=datetime.now(timezone.utc) + access_token_expires)
    return data


@router.get("/users/me/")
async def read_users_me(
    current_user: Annotated[Union[Lawyer, Client, Secretary],Depends(get_current_user)]
):
    return current_user


