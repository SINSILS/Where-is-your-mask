from app.models.common import Model, ObjectId


class Configuration(Model):
    colors: list[str]
    stickers: list[ObjectId]
