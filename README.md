🛒 Shoplifting Detection System (YOLO + LSTM)
📌 Overview:
This project is an AI-powered surveillance system that detects suspicious human activity (shoplifting) in retail stores using deep learning.

It combines:
YOLO (You Only Look Once) for real-time object detection
LSTM (Long Short-Term Memory) for sequence-based behavior analysis
🚀 Features
🔍 Real-time person detection using YOLO
🧠 Suspicious activity classification using LSTM
📹 Works on video streams / CCTV footage
🚨 Alert system for suspicious behavior
📊 Scalable for retail security analytics

🛠️ Tech Stack
Python
OpenCV
YOLOv8 / YOLO-Pose
LSTM (TensorFlow / PyTorch)
Flask (for backend integration)
HTML/CSS/JS (Frontend)

📂 Project Structure
SuspiciousWatcher2/
│── client/        # Frontend
│── server/        # Backend (Flask / Node)
│── models/        # Trained models
│── utils/         # Helper functions
│── README.md
│── requirements.txt


⚙️ Installation
1. Clone the repository
git clone https://github.com/yash7756/shoplifting-detection-yolo-lstm.git
cd shoplifting-detection-yolo-lstm
2. Install dependencies
pip install -r requirements.txt
3. Run the project
python app.py


📊 Dataset
Custom annotated dataset (~15,000 images)
Annotated using CVAT


🎯 Use Cases
Retail store security
Smart surveillance systems
Loss prevention analytics

🔮 Future Improvements
🔗 Real-time alert notifications (SMS / Email)
☁️ Cloud deployment (AWS / Azure)
📱 Mobile app integration
🧠 Improved accuracy with transformer models

👨‍💻 Author
Yash Ambole
