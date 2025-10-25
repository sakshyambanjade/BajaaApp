import json
from channels.generic.websocket import AsyncWebsocketConsumer

class LiveDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'live_race_data'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Handle incoming messages
        
    async def race_update(self, event):
        # Send race updates to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'race_update',
            'data': event['data']
        }))
