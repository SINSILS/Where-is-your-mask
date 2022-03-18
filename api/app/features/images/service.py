from app.core.mongo import fs, db
from app.models.common import ObjectId, Model


class StoreImageResult(Model):
    id: ObjectId
    media_type: str


class StoredImage(Model):
    media_type: str
    content: bytes


def __images_collection():
    return db.get_collection('images')


def get_image(image_id: ObjectId):
    image_record = __images_collection().find_one({'fs_id': image_id})

    if image_record is None:
        return None

    return StoredImage(
        media_type=image_record['media_type'],
        content=fs.get(image_record['fs_id']).read()
    )


def upload_image(image_content: bytes, content_type: str):
    fs_id = fs.put(image_content)

    __images_collection().insert_one({
        'fs_id': fs_id,
        'media_type': content_type
    })

    return StoreImageResult(id=fs_id, media_type=content_type)
