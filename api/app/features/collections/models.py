from app.models.common import Model, ObjectId


class CreateCollectionRequest(Model):
    name: str
    description: str
    image_id: ObjectId


class CreateMaskRequest(Model):
    name: str
    description: str
    image_id: ObjectId
    price: float


class Mask(Model):
    id: ObjectId
    name: str
    description: str
    image_id: ObjectId
    price: float


class Collection(Model):
    id: ObjectId
    name: str
    description: str
    image_id: ObjectId
    masks: list[Mask]
