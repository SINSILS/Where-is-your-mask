from bson import ObjectId as BaseObjectId


class ObjectId(BaseObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        return BaseObjectId(str(v))
