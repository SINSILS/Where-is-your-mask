import pymongo
from datetime import datetime
from app.core.mongo import db
from app.features.orders.models import Order


def __orders_collection():
    return db.get_collection('orders')


def __map_order(raw_order):
    return Order(
        id=raw_order['_id'],
        status=raw_order['status'],
        date=raw_order['date'],
        order=raw_order['order'],
    )


def get_orders():
    return [
        __map_order(order)
        for order in __orders_collection().find({'type': {'$ne': 3}}).sort('date', pymongo.DESCENDING)
    ]


def create_order(order: list[dict]):
    default_values = {
        'status': 0,
        'date': datetime.now(),
        'order': order,
    }

    insert_result = __orders_collection().insert_one(default_values)

    return Order(
        id=insert_result.inserted_id,
        **default_values,
    )

