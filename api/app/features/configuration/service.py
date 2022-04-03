from pymongo import ReturnDocument

from app.core.mongo import db
from app.features.configuration.models import Configuration
from app.models.common import ObjectId


def __configuration_collection():
    return db.get_collection('configuration')


def __map_configuration(raw_configuration):
    return Configuration(
        colors=raw_configuration.get('colors', []),
        stickers=raw_configuration.get('stickers', [])
    )


def __update_configuration(update) -> Configuration:
    configuration = __configuration_collection().find_one_and_update(
        filter={},
        update=update,
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return __map_configuration(configuration)


def get_configuration() -> Configuration:
    configuration = __configuration_collection().find_one()

    return (
        Configuration(colors=[], stickers=[]) if configuration is None
        else __map_configuration(configuration)
    )


def add_color(color: str):
    return __update_configuration({'$addToSet': {'colors': color}})


def remove_color(color: str):
    return __update_configuration({'$pull': {'colors': color}})


def add_sticker(image_id: ObjectId):
    return __update_configuration({'$addToSet': {'stickers': image_id}})


def remove_sticker(image_id: ObjectId):
    return __update_configuration({'$pull': {'stickers': image_id}})
