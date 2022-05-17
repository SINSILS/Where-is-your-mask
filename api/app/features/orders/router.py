from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

import app.features.orders.service as orders_service

router = APIRouter(prefix='/orders')


@router.get('/')
def get_orders(authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return {
        'orders': orders_service.get_orders()
    }


@router.post('/')
def create_order(order: list[dict]):
    return orders_service.create_order(order)
