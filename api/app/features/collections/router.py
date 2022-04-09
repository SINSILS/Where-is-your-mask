from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

import app.features.collections.service as collections_service
from app.features.collections.models import CreateCollectionRequest

router = APIRouter(prefix='/collections')


@router.get('/')
def get_collections():
    return {
        'collections': collections_service.get_collections()
    }


@router.post('/')
def create_collection(create_collection_request: CreateCollectionRequest, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return collections_service.create_collection(create_collection_request)
