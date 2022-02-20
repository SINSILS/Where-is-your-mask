from fastapi import FastAPI
from src.core.mongo import db

app = FastAPI()


@app.get('/')
def read_root():
    db.get_collection('masks').insert_one({'hello': 'world'})

    return {'Hello': 'World'}
