from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from backend.bridge import bridge

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "TradingAgents Bridge Server is running"}

@app.websocket("/ws/agents")
async def websocket_endpoint(websocket: WebSocket):
    await bridge.connect(websocket)
    try:
        # Send initial message upon connection
        await bridge.send_event("status", {"message": "Initializing analysis..."}, connection=websocket)

        while True:
            # Wait for messages from the client
            data = await websocket.receive_text()
            # For now, we just echo or log the ticker request
            # This is where ticker requests would be routed to agents
            await bridge.send_event("echo", {"received": data}, connection=websocket)

    except WebSocketDisconnect:
        bridge.disconnect(websocket)
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        bridge.disconnect(websocket)
