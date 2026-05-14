import json
import asyncio
from typing import List, Dict
from fastapi import WebSocket

class AgentBridge:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_event(self, event_type: str, payload: Dict, connection: WebSocket = None):
        """
        Sends a JSON event to a specific connection or to all active connections.
        """
        message = json.dumps({
            "type": event_type,
            "payload": payload
        })

        if connection:
            await connection.send_text(message)
        else:
            # Broadcast to all
            for conn in self.active_connections:
                try:
                    await conn.send_text(message)
                except Exception:
                    # Handle stale connections
                    pass

# Global bridge instance
bridge = AgentBridge()
