import pymongo

from app.core.mongo import db
from app.features.collections.models import Collection, CreateCollectionRequest


def __collections_collection():
    return db.get_collection('collections')


def get_collections() -> list[Collection]:
    raw_collections = __collections_collection().find().sort('_id', pymongo.DESCENDING)

    return [
        Collection(
            id=raw['_id'],
            name=raw['name'],
            description=raw['description'],
            image_id=raw['image_id']
        )
        for raw in raw_collections
    ]


def create_collection(collection: CreateCollectionRequest) -> Collection:
    insert_result = __collections_collection().insert_one(collection.dict())

    return Collection(
        id=insert_result.inserted_id,
        **collection.dict()
    )
