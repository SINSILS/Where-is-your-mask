from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

import app.features.orders.service as orders_service
from app.models.common import ObjectId

router = APIRouter(prefix='/orders')


@router.get('/')
def get_orders(authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return {
        'orders': orders_service.get_orders()
    }


@router.get('/{order_id}')
def get_orders(order_id: ObjectId, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    return orders_service.get_order(order_id)


@router.post('/')
def create_order(order: dict):
    return orders_service.create_order(order)


@router.post('/{order_id}/status')
def update_order_status(order_id: ObjectId, status: int):
    orders_service.update_order_status(order_id, status)

    return {'success': True}
