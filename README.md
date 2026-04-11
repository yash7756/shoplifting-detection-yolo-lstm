# 🛒 AI-Based Shoplifting Detection System (YOLO + LSTM)

## 📌 Overview

The **Shoplifting Detection System** is an AI-powered surveillance solution that detects **suspicious human behavior** in retail environments using computer vision and deep learning.

The system combines **YOLO (object detection)** and **LSTM (temporal sequence modeling)** to identify abnormal activities such as shoplifting in real-time video streams.

---

## 🚀 Features

* 🎯 Real-time human detection using YOLOv8 / YOLO-Pose
* 🧠 Behavior analysis using LSTM (sequence learning)
* 🚨 Suspicious activity classification (normal vs abnormal)
* 📹 Works with CCTV footage / video input
* 🔔 Alert system for security personnel
* 📊 Scalable for retail analytics

---

## 🛠️ Tech Stack

* **Programming:** Python
* **Computer Vision:** OpenCV
* **Model:** YOLOv8, YOLO-Pose
* **Deep Learning:** LSTM (TensorFlow / PyTorch)
* **Backend:** Flask
* **Frontend:** HTML, CSS, JavaScript

---

## 📂 Project Structure

```id="9x4x0k"
Shoplifting-Detection/
│── client/            # Frontend UI
│── server/            # Backend (Flask API)
│── models/            # Trained models (.pt files)
│── dataset/           # Training dataset
│── utils/             # Helper scripts
│── app.py             # Main application
│── README.md
│── requirements.txt
```

---

## ⚙️ How It Works

1. 🎥 Video input is captured from CCTV / file
2. 👤 YOLO detects humans and extracts key features
3. 🧠 Sequential frames are passed to LSTM model
4. ⚠️ System classifies activity (Normal / Suspicious)
5. 🚨 Alert is triggered if suspicious behavior is detected

---

## 📊 Dataset

* 📁 Custom dataset (~15,000 annotated images)
* 🏷️ Annotation tool: CVAT
* 🎯 Classes: Normal activity, Suspicious activity

---

## 🧪 Model Details

* **YOLO:** Used for real-time object/person detection
* **YOLO-Pose:** Extracts human pose keypoints
* **LSTM:** Captures temporal patterns in human behavior
* **Output:** Binary classification (Normal / Suspicious)

---

## 📸 Demo

<img width="1271" height="779" alt="Screenshot 2025-03-27 213831" src="https://github.com/user-attachments/assets/dc103e8d-2be9-44fa-8020-f3a779a11b0c" />

<img width="1920" height="1080" alt="Screenshot 2024-12-13 181904" src="https://github.com/user-attachments/assets/5916a575-1530-4a4d-8a4a-7c1101701087" />


---

## 🎯 Use Cases

* 🏬 Retail store security
* 🛡️ Loss prevention systems
* 🧠 Smart surveillance solutions
* 📊 Customer behavior analytics

---


## 👨‍💻 Author

**Yash Ambole**

Computer Engineering | AI/ML Enthusiast

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
