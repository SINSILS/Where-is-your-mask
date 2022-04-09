from app.models.common import Model, ObjectId


class CreateCollectionRequest(Model):
    name: str
    description: str
    image_id: ObjectId


class Collection(Model):
    id: ObjectId
    name: str
    description: str
    image_id: ObjectId
