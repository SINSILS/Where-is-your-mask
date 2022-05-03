from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.params import File
from starlette.responses import Response

import app.features.images.service as images_service
from app.models.common import ObjectId


router = APIRouter(prefix='/images')


@router.get('/{image_id}')
def get_image(image_id: ObjectId):
    image = images_service.get_image(image_id)

    if image is None:
        raise HTTPException(status_code=404)

    return Response(content=image.content, media_type=image.media_type)


@router.post('/')
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ('image/jpeg', 'image/png', 'application/octet-stream'):
        raise HTTPException(status_code=400)

    return images_service.upload_image(await file.read(), file.content_type)
