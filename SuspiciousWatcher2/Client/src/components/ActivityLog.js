import React from 'react';

const ActivityLog = ({ activities, latestActivity }) => {
  // If no activities, display empty state
  if (!activities || activities.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Activity Log</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
            <p className="text-muted">No activities detected yet</p>
          </div>
        </div>
      </div>
    );
  }

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Determine the severity class based on activity type
  const getSeverityClass = (activity) => {
    if (activity.type.includes("Unknown person") || activity.type.includes("Suspicious object")) {
      return "bg-danger";
    } else if (activity.type.includes("Unusual behavior") || activity.type.includes("Loitering")) {
      return "bg-warning";
    } else {
      return "bg-info";
    }
  };

  // Determine if an activity is new (latest)
  const isLatestActivity = (activity) => {
    return latestActivity && activity.id === latestActivity.id;
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Activity Log</h5>
        <span className="badge bg-secondary">{activities.length} activities</span>
      </div>
      <div className="card-body p-0">
        <div className="activity-list" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`activity-item p-3 border-bottom ${isLatestActivity(activity) ? 'bg-dark' : ''}`}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <span className={`badge ${getSeverityClass(activity)} me-2`}>
                    {activity.type}
                  </span>
                  {isLatestActivity(activity) && (
                    <span className="badge bg-danger">New</span>
                  )}
                </div>
                <small className="text-muted">
                  {formatTimestamp(activity.timestamp)}
                </small>
              </div>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    Confidence: {Math.round(activity.confidence * 100)}%
                  </small>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    <i className="fas fa-expand-alt"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-bell-slash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer text-center">
        <button className="btn btn-sm btn-secondary">
          <i className="fas fa-download me-1"></i> Export Log
        </button>
      </div>
    </div>
  );
};

export default ActivityLog;
