import re
from models_db.lawyer import Lawyer
from models_db.client import Client
from models_db.secretary import Secretary
def get_user_type(email):
    pattern =  r"(?<=@)[a-zA-Z0-9-]+"
    user_type = re.search(pattern, email).group(0)
    if user_type == "lawyer":
        return "lawyer"
    elif user_type == "client":
        return "client"
    elif user_type == "secretary":
        return "secretary"
    else:
        return None 
def get_user(email, db):
    user_type = get_user_type(email)
    if user_type:
        for em, pw in db[user_type]:
            if em == email:
                return (em, pw)
        return None #user not found

    else: # invalid user type
        return None
    
def get_user_class(username):
    pattern =  r"(?<=@)[a-zA-Z0-9-]+"
    user_type = re.search(pattern, username).group(0)
    if user_type == "lawyer":
        return Lawyer
    elif user_type == "client":
        return Client
    elif user_type == "secretary":
        return Secretary
    else:
        return None 