from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT

import app.features.collections.service as collections_service
from app.features.collections.models import CreateCollectionRequest, CreateMaskRequest
from app.models.common import ObjectId

router = APIRouter(prefix='/collections')


@router.get('/')
def get_collections():
    return {
        'collections': collections_service.get_collections()
    }


@router.get('/{collection_id}')
def get_collections(collection_id: ObjectId):
    collection = collections_service.get_collection(collection_id)

    if collection is None:
        raise HTTPException(status_code=404)

    return collection


@router.post('/')
def create_collection(create_collection_request: CreateCollectionRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return collections_service.create_collection(create_collection_request)


@router.post('/{collection_id}/masks')
def create_collection(
    collection_id: ObjectId,
    create_mask_request: CreateMaskRequest,
    authorize: AuthJWT = Depends()
):
    authorize.jwt_required()

    return collections_service.create_mask(collection_id, create_mask_request)


@router.put('/{collection_id}')
def update_collection(
    collection_id: ObjectId,
    update_collection_request: CreateCollectionRequest,
    authorize: AuthJWT = Depends()
):
    authorize.jwt_required()

    return collections_service.update_collection(collection_id, update_collection_request)


@router.delete('/{collection_id}')
def delete_collection(collection_id: ObjectId, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    collections_service.delete_collection(collection_id)

    return {'success': True}


@router.delete('/{collection_id}/masks/{mask_id}')
def delete_collection(collection_id: ObjectId, mask_id: ObjectId, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    collections_service.delete_mask(collection_id, mask_id)

    return {'success': True}
