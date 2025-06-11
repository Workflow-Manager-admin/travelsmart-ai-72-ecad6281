import React from "react";

// PUBLIC_INTERFACE
function WeatherPage() {
  /** Weather Page - current and forecasted weather for destinations */
  return (
    <div className="container">
      <div className="hero">
        <div className="subtitle">Weather Checker</div>
        <h1 className="title">Destination Weather</h1>
        <div className="description">
          Check the current and 5-day forecasted weather for your travel destination.
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
