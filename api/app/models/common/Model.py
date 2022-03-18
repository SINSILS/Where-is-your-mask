import bson
from pydantic import BaseModel, BaseConfig

from .ObjectId import ObjectId


class Model(BaseModel):
    class Config(BaseConfig):
        json_encoders = {
            ObjectId: str,
            bson.ObjectId: str,
        }
