import pymongo
from datetime import datetime
from app.core.mongo import db
from app.features.orders.models import Order
from app.models.common import ObjectId


def __orders_collection():
    return db.get_collection('orders')


def __map_order(raw_order):
    return Order(
        id=raw_order['_id'],
        status=raw_order['status'],
        date=raw_order['date'],
        order=raw_order['order'],
        shipping_information=raw_order['shipping_information'],
    )


def get_orders():
    return [
        __map_order(order)
        for order in __orders_collection().find({'status': {'$ne': 3}}).sort('date', pymongo.DESCENDING)
    ]


def get_order(order_id: ObjectId):
    return __map_order(
        __orders_collection().find_one({'status': {'$ne': 3}, '_id': order_id})
    )


def create_order(order: dict):
    default_values = {
        'status': 0,
        'date': datetime.now(),
        'order': order['items'],
        'shipping_information': order['shipping_information']
    }

    insert_result = __orders_collection().insert_one(default_values)

    return Order(
        id=insert_result.inserted_id,
        **default_values,
    )


def update_order_status(order_id: ObjectId, status: int):
    __orders_collection().update_one({'_id': order_id}, {'$set': {'status': status}})
