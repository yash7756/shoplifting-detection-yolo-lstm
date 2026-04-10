import React, { useRef, useEffect, useState } from "react";

const CameraFeed = ({ isDetecting }) => {
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [error, setError] = useState(null);

  // Start camera when component mounts
  // const sendVideoData = async (stream) => {
  //   const socket = new WebSocket("ws://localhost:8765"); // Update to your server URL

  //   socket.onopen = () => {
  //     console.log("WebSocket connection established");
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         socket.send(event.data);
  //       }
  //     };
  //     mediaRecorder.start(1000); // Send data every second
  //   };

  //   socket.onmessage = (event) => {
  //     console.log("Message from server:", event.data); // Log the "okay" message
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };
  // };
  const sendVideoData = (stream) => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = () => {
      console.log("WebSocket connection established");

      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const sendFrame = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob && socket.readyState === WebSocket.OPEN) {
                blob.arrayBuffer().then((buffer) => {
                  socket.send(buffer);
                });
              }
            },
            "image/jpeg",
            0.8
          ); // compress to JPEG
        };

        setInterval(sendFrame, 100); // send frame every 100ms
      });
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      alert(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  useEffect(() => {
    async function startCamera() {
      try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user", // Use the front camera (for laptops, this is the default)
          },
        });

        // Store the stream for later cleanup
        setCameraStream(stream);

        // Set the video source to the camera stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        sendVideoData(stream);

        setError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(
          "Failed to access camera. Please ensure camera permissions are granted."
        );
      }
    }

    startCamera();

    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="camera-feed-container">
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="position-relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-100 rounded"
            style={{ maxHeight: "60vh" }}
          />

          {isDetecting && (
            <div className="position-absolute top-0 end-0 p-2">
              <div className="badge bg-danger d-flex align-items-center">
                <span className="me-1">Recording</span>
                <div className="recording-indicator"></div>
              </div>
            </div>
          )}

          <style jsx="true">{`
            .recording-indicator {
              width: 12px;
              height: 12px;
              background-color: red;
              border-radius: 50%;
              animation: pulse 1.5s infinite;
            }

            @keyframes pulse {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0.3;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

      <div className="mt-3 text-center text-muted">
        <small>
          {isDetecting
            ? "System is actively monitoring for suspicious activities..."
            : "Start detection to begin monitoring"}
        </small>
      </div>
    </div>
  );
};

export default CameraFeed;
