from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core import config
from app.features.images import router as images_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.web_url,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(images_router)
