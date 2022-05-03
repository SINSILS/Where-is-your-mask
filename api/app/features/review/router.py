import base64
from fastapi import APIRouter
from starlette.websockets import WebSocket
from websockets.exceptions import ConnectionClosedError
from app.models.common import ObjectId
from app.features.images import service as images_service
import app.features.review.review as review


router = APIRouter(prefix='/review')


@router.websocket_route('/review/on-face')
async def review_on_face(websocket: WebSocket):
    await websocket.accept()

    mask_image_id = ObjectId(await websocket.receive_text())
    mask_image_raw = images_service.get_image(mask_image_id).content
    mask_image = review.preprocess_mask_image(mask_image_raw)
    indexes_triangles = []

    while True:
        try:
            input_image_url = await websocket.receive_text()

            _, encoded_img = input_image_url.split(',', 1)

            output_img = review.create_review_image(base64.b64decode(encoded_img), mask_image, indexes_triangles)
            output_encoded_img = base64.b64encode(output_img).decode('ascii')

            await websocket.send_text(
                f'data:image/png;base64,{output_encoded_img}'
            )
        except ConnectionClosedError:
            break

    await websocket.close()
