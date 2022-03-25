import bson
from pydantic import BaseModel, BaseConfig
from stringcase import camelcase

from .ObjectId import ObjectId


class Model(BaseModel):
    class Config(BaseConfig):
        alias_generator = camelcase
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            bson.ObjectId: str,
        }
