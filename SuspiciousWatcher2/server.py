# server.py
import asyncio
import websockets
import cv2
import numpy as np

async def handle_connection(websocket, path):
    print("Client connected")
    try:
        while True:
            # Wait for video data from the client
            data = await websocket.recv()
            print("Received frame data")

            # Here you can process the received data if needed
            # For example, you can convert it to a numpy array if it's in a specific format
            # frame = np.frombuffer(data, np.uint8)

            # Send an "okay" message back to the client
            await websocket.send("okay")
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")

async def main():
    async with websockets.serve(handle_connection, "localhost", 8765):
        print("WebSocket server is running on ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())