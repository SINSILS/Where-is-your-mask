from datetime import datetime
from app.models.common import Model, ObjectId


class Order(Model):
    id: ObjectId
    status: int
    date: datetime
    order: list[dict]
