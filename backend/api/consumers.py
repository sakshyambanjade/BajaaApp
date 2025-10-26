import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from api.openf1_service import OpenF1Service


class LiveF1Consumer(AsyncWebsocketConsumer):
    """Handles live F1 WebSocket connections and data streaming."""

    async def connect(self):
        """Accepts a new WebSocket connection and adds it to the group."""
        await self.channel_layer.group_add("live_f1", self.channel_name)
        await self.accept()

    async def disconnect(self, _):
        """Removes the WebSocket connection from the live F1 group."""
        await self.channel_layer.group_discard("live_f1", self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        """Handles incoming messages from the WebSocket client."""
        if text_data is not None:
            data = json.loads(text_data)
            message_type = data.get('type')

            if message_type == 'subscribe_session':
                session_key = data.get('session_key')
                # Start streaming data for this session
                await self.stream_session_data(session_key)

    async def stream_session_data(self, session_key):
        """Stream live F1 data to connected clients."""
        service = OpenF1Service()
        while True:
            service.get_live_positions(session_key)
            positions = None
            if positions is None:
                positions = {}
            await self.send(text_data=json.dumps({
                'type': 'position_update',
                'data': positions
            }))
            await asyncio.sleep(1)  # Update every second
            await asyncio.sleep(1)  # Update every second
