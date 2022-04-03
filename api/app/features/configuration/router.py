from fastapi import APIRouter
from fastapi.params import Depends
from fastapi_jwt_auth import AuthJWT

import app.features.configuration.service as configuration_service
from app.models.common import Model, ObjectId

router = APIRouter(prefix='/configuration')


class ColorRequest(Model):
    color: str


class ImageRequest(Model):
    imageId: ObjectId


@router.get('/')
def get_configuration():
    return configuration_service.get_configuration()


@router.post('/colors')
def add_color_to_configuration(add_color_request: ColorRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return configuration_service.add_color(add_color_request.color)


@router.delete('/colors')
def remove_color_from_configuration(add_color_request: ColorRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return configuration_service.remove_color(add_color_request.color)


@router.post('/stickers')
def add_sticker_to_configuration(add_sticker_request: ImageRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return configuration_service.add_sticker(add_sticker_request.imageId)


@router.delete('/stickers')
def remove_sticker_from_configuration(add_sticker_request: ImageRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return configuration_service.remove_sticker(add_sticker_request.imageId)
