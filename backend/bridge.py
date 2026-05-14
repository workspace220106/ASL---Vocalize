import json
import asyncio
from typing import List, Dict
from fastapi import WebSocket
from backend.agents.trading_graph import graph
from backend.agents.state import TradingState

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

    async def process_ticker(self, ticker: str, connection: WebSocket):
        """
        Runs the trading graph for a given ticker and streams agent thoughts to the websocket.
        """
        initial_state: TradingState = {
            "ticker": ticker,
            "analysis_reports": [],
            "sentiment": 0.0,
            "decision": "Wait",
            "logs": []
        }

        # graph.stream yields (node_name, output_dict)
        async for event in graph.astream(initial_state):
            for node_name, output in event.items():
                # Extract a log or report from the output if it exists
                log_entry = output.get("logs", [f"Node {node_name} finished execution"])[-1]

                await self.send_event(
                    "agent_thought",
                    {"node": node_name, "thought": log_entry},
                    connection=connection
                )

# Global bridge instance
bridge = AgentBridge()
