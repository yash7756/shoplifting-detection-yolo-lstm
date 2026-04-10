import asyncio
import websockets
import cv2
import numpy as np
from ultralytics import YOLO
import time

# ==========================
# 1. Helper Functions
# ==========================
def get_torso_box(keypoints):
    if len(keypoints) < 13:
        return None
    shoulders = keypoints[5:7]
    hips = keypoints[11:13]
    valid = all(kp[2] > 0.5 for kp in shoulders + hips)
    if not valid:
        return None
    x_min = min(shoulders[0][0], shoulders[1][0], hips[0][0], hips[1][0])
    x_max = max(shoulders[0][0], shoulders[1][0], hips[0][0], hips[1][0])
    y_min = min(shoulders[0][1], shoulders[1][1])
    y_max = max(hips[0][1], hips[1][1])
    return (int(x_min), int(y_min), int(x_max), int(y_max))

def is_hand_near_torso(keypoints, torso_box):
    if torso_box is None:
        return False, 0.0
    hands = keypoints[9:11]
    tx_min, ty_min, tx_max, ty_max = torso_box

    for hand in hands:
        if hand[2] > 0.5:
            hx, hy = int(hand[0]), int(hand[1])
            if (tx_min - 20 < hx < tx_max + 20) and (ty_min - 20 < hy < ty_max + 20):
                return True, hand[2]
    return False, 0.0

# ==========================
# 2. Load YOLO Model
# ==========================
model = YOLO("yolov8n-pose.pt")  # Make sure the model is in the correct path

# ==========================
# 3. Handle WebSocket Connection
# ==========================
async def handle_connection(websocket, path):
    print("Client connected")
    frame_counter = 0  # frame counter
    last_detection_time = 0  # Timestamp for last suspicious activity detection

    try:
        while True:
            # Receive data from client (frame)
            data = await websocket.recv()
            frame_counter += 1

            # Skip frames, process every 5th frame
            if frame_counter % 5 != 0:
                continue  # Skip this frame

            # Decode frame
            np_data = np.frombuffer(data, dtype=np.uint8)
            frame = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

            if frame is None:
                continue

            # Resize frame for YOLO input
            resized_frame = cv2.resize(frame, (640, 640))

            # Perform pose detection
            results = model.track(resized_frame, persist=True, verbose=False)

            annotated_frame = resized_frame.copy()
            boxes = results[0].boxes
            keypoints = results[0].keypoints

            suspicious_detected = False

            if boxes is not None and keypoints is not None and boxes.id is not None:
                for box, track_id, kp in zip(boxes.xywh, boxes.id, keypoints.data):
                    if boxes.cls[boxes.id == track_id].item() == 0:
                        x, y, w, h = box
                        kp_data = kp.cpu().numpy()

                        torso_box = get_torso_box(kp_data)
                        suspicious, confidence = is_hand_near_torso(kp_data, torso_box)

                        if suspicious:
                            current_time = time.time()

                            # Only send alert if 10 seconds have passed since the last alert
                            if current_time - last_detection_time > 10:
                                confidence_percent = round(confidence * 100, 2)
                                alert_message = f"Suspicious activity detected! Confidence: {confidence_percent}%"
                                print(alert_message)  # Log to console

                                # Send the alert message as a string to the WebSocket client
                                await websocket.send(alert_message)
                                suspicious_detected = True
                                last_detection_time = current_time  # Update last detection time

            # Send back the frame with annotations only if suspicious activity was detected
            if suspicious_detected:
                _, buffer = cv2.imencode('.jpg', annotated_frame)
                if buffer is not None:
                    await websocket.send(buffer.tobytes())

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    except Exception as e:
        print("Error:", str(e))

# ==========================
# 4. Start WebSocket Server
# ==========================
async def main():
    async with websockets.serve(handle_connection, "localhost", 8765):
        print("WebSocket server is running on ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
