import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function HomePage() {
  /** Home Page - intro and navigation hub for TravelSmart AI */
  return (
    <div className="container">
      <div className="hero">
        <div className="subtitle">Welcome to TravelSmart AI ✈️</div>
        <h1 className="title">Your Smart Travel Companion</h1>
        <div className="description">
          Plan trips, generate itineraries, get weather updates, and chat with our AI-powered assistant—all in one place.
          <br />
          <br />
          <b>What would you like to do?</b>
        </div>
        <div style={{ display: "flex", gap: "24px", marginTop: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-large" to="/itinerary">AI Itinerary Generator</Link>
          <Link className="btn btn-large" to="/weather">Weather Checker</Link>
          <Link className="btn btn-large" to="/chat">Travel AI Chatbot</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
