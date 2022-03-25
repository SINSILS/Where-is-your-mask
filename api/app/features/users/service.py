import hashlib

from app.core.mongo import db
from app.features.users.models import UserCredentials


def __users_collection():
    return db.get_collection('users')


# don't do this
def __hash_password(password: str):
    return hashlib.sha512(password.encode('utf-8')).digest().hex()


def has_user(email: str):
    return __users_collection().find_one({'email': email}) is not None


def create_user(credentials: UserCredentials):
    __users_collection().insert_one({
        'email': credentials.email,
        'password': __hash_password(credentials.password),
    })


def get_user_id_by_credentials(credentials: UserCredentials):
    user = __users_collection().find_one({'email': credentials.email})

    return (
        None if user is None or user['password'] != __hash_password(credentials.password)
        else user['_id']
    )
