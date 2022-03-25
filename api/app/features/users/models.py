from app.models.common import Model


class UserCredentials(Model):
    email: str
    password: str
