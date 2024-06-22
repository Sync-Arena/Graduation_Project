// Loading.js
import React from 'react';
import './Loading.css'; // Import the CSS file

function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
