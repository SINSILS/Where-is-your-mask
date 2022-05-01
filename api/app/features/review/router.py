from fastapi import APIRouter
from starlette.websockets import WebSocket
from websockets.exceptions import ConnectionClosedError

router = APIRouter(prefix='/review')


@router.websocket_route('/review/on-face')
async def review_on_face(websocket: WebSocket):
    await websocket.accept()

    while True:
        response = await websocket.receive_text()

        try:
            await websocket.send_text(response)
        except ConnectionClosedError:
            break

    await websocket.close()
