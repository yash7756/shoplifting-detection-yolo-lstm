import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="fas fa-video me-2"></i>
          <span>Suspicious Activity Detection</span>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <i className="fas fa-home me-1"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-history me-1"></i> History
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-cog me-1"></i> Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-question-circle me-1"></i> Help
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
