import pymongo

from app.core.mongo import db
from app.features.collections.models import Collection, CreateCollectionRequest, Mask, CreateMaskRequest
from app.models.common import ObjectId


def __collections_collection():
    return db.get_collection('collections')


def __map_collection(raw_collection):
    return Collection(
        id=raw_collection['_id'],
        name=raw_collection['name'],
        description=raw_collection['description'],
        image_id=raw_collection['image_id'],
        masks=[
            Mask(
                id=raw_mask['_id'],
                name=raw_mask['name'],
                description=raw_mask['description'],
                image_id=raw_mask['image_id'],
                price=raw_mask['price'],
            )
            for raw_mask in raw_collection.get('masks', [])
        ]
    )


def get_collections() -> list[Collection]:
    raw_collections = __collections_collection().find().sort('_id', pymongo.DESCENDING)

    return [__map_collection(raw) for raw in raw_collections]


def get_collection(collection_id: ObjectId):
    collection = __collections_collection().find_one({'_id': collection_id})

    return None if collection is None else __map_collection(collection)


def create_collection(collection: CreateCollectionRequest) -> Collection:
    insert_result = __collections_collection().insert_one(collection.dict())

    return Collection(
        id=insert_result.inserted_id,
        masks=[],
        **collection.dict()
    )


def update_collection(collection_id: ObjectId, collection: CreateCollectionRequest) -> Collection:
    __collections_collection().update_one(
        {'_id': collection_id},
        {'$set': collection.dict()}
    )

    return get_collection(collection_id)


def delete_collection(collection_id: ObjectId):
    __collections_collection().delete_one({'_id': collection_id})


def create_mask(collection_id: ObjectId, mask: CreateMaskRequest) -> Mask:
    mask_id = ObjectId()

    __collections_collection().update_one(
        {'_id': collection_id},
        {
            '$push': {
                'masks': {
                    '_id': mask_id,
                    **mask.dict()
                }
            }
        }
    )

    return Mask(id=mask_id, **mask.dict())


def delete_mask(collection_id: ObjectId, mask_id: ObjectId):
    __collections_collection().update_one(
        {'_id': collection_id},
        {
            '$pull': {
                'masks': {
                    '_id': mask_id
                }
            }
        }
    )
