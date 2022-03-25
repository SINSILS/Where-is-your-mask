from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from datetime import timedelta

import app.features.users.service as users_service
from app.features.users.models import UserCredentials
from app.models.common import Model


class AdminUserResponse(Model):
    is_admin: bool


class AccessTokenResponse(Model):
    access_token: str


router = APIRouter(prefix='/users')


@router.get('/me')
def get_user(authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return AdminUserResponse(is_admin=True)


@router.post('/login')
def login(credentials: UserCredentials, authorize: AuthJWT = Depends()):
    user_id = users_service.get_user_id_by_credentials(credentials)

    if user_id is None:
        raise HTTPException(status_code=400)

    return AccessTokenResponse(
        access_token=authorize.create_access_token(
            subject=str(user_id),
            expires_time=timedelta(days=365)
        )
    )
