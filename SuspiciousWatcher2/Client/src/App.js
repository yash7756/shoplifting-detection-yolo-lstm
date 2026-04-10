import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CameraFeed from "./components/CameraFeed";
import ActivityLog from "./components/ActivityLog";

function App() {
  const [error, setError] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  // const [error, setError] = useState(false);

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
  };

  return (
    <div className="app">
      <Navbar />

      <main className="container mt-4">
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Live Camera Feed</h5>
                <button
                  className={`btn ${
                    isDetecting ? "btn-danger" : "btn-success"
                  }`}
                  onClick={toggleDetection}
                >
                  {isDetecting ? (
                    <>
                      <i className="fas fa-stop-circle me-2"></i>
                      Stop Detection
                    </>
                  ) : (
                    <>
                      <i className="fas fa-play-circle me-2"></i>
                      Start Detection
                    </>
                  )}
                </button>
              </div>
              <div className="card-body">
                <CameraFeed isDetecting={isDetecting} />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* <ActivityLog
              activities={activities}
              latestActivity={latestActivity}
            /> */}
          </div>
        </div>

        {/* {isDetecting && latestActivity && (
          <div
            className="alert alert-warning alert-dismissible fade show mt-3"
            role="alert"
          >
            <strong>Alert!</strong> {latestActivity.type} detected at{" "}
            {new Date(latestActivity.timestamp).toLocaleString()} (Confidence:{" "}
            {latestActivity.confidence * 100}%)
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )} */}
      </main>

      <footer className="container mt-5 mb-3 text-center text-muted">
        <p className="mb-1">Suspicious Activity Detection System</p>
        <p className="mb-0">Using laptop camera as CCTV feed</p>
      </footer>
    </div>
  );
}

export default App;
