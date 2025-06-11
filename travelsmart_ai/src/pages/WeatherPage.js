import React, { useState } from "react";

// Simulated mock API for weather. Replace with real API endpoint as needed.
function fetchWeatherData(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!city || city.toLowerCase() === "atlantis") {
        reject("Weather data unavailable for this city.");
      } else {
        resolve({
          current: {
            temp: 22,
            desc: "Partly Cloudy",
            humidity: 65,
            wind: 12,
          },
          forecast: [
            { day: "Mon", temp: 24, desc: "Sunny" },
            { day: "Tue", temp: 22, desc: "Partly Cloudy" },
            { day: "Wed", temp: 19, desc: "Rain" },
            { day: "Thu", temp: 20, desc: "Mostly Cloudy" },
            { day: "Fri", temp: 23, desc: "Sunny" },
          ],
        });
      }
    }, 1200);
  });
}

// PUBLIC_INTERFACE
function WeatherPage() {
  /**
   * Weather Page - User enters city, fetches weather info and forecast.
   * Uses a simulated API function; replace with real backend API as needed.
   */
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWeather(null);
    setError("");
    setLoading(true);
    try {
      const result = await fetchWeatherData(city);
      setWeather(result);
    } catch (err) {
      setError(err + "");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="hero">
        <div className="subtitle">Weather Checker</div>
        <h1 className="title">Destination Weather</h1>
        <div className="description">
          Check the current and 5-day forecasted weather for your travel destination.
        </div>
        <form onSubmit={handleSubmit} style={{maxWidth: 380, margin: "30px auto 0 auto", textAlign:"center"}}>
          <input
            type="text"
            placeholder="Enter city name"
            style={{
              width: "66%",
              padding: "10px",
              fontSize: 16,
              marginRight: 8,
              borderRadius: 4,
              border: "1px solid var(--border-color)"
            }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button className="btn" type="submit" disabled={loading || !city}>
            {loading ? "Checking..." : "Check Weather"}
          </button>
        </form>
        {error && <div style={{ color: "#f39512", marginTop: 24 }}>{error}</div>}
        {weather && (
          <div style={{marginTop: 36, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 30, maxWidth: 380, marginLeft: "auto", marginRight: "auto"}}>
            <div style={{fontWeight: "bold", fontSize: "1.2rem"}}>
              {city[0]?.toUpperCase() + city.slice(1)} - Current Weather
            </div>
            <div style={{margin: "16px 0 8px 0"}}>
              <b>Temperature:</b> {weather.current.temp}°C &nbsp;|&nbsp; 
              <b>{weather.current.desc}</b>
            </div>
            <div>
              <b>Humidity:</b> {weather.current.humidity}% &nbsp; 
              <b>Wind:</b> {weather.current.wind} km/h
            </div>
            <div style={{marginTop: 22, fontWeight: "bold", color: "var(--base-light)"}}>
              5-Day Forecast
            </div>
            <div style={{display: "flex", gap: "16px", justifyContent: "center", marginTop: 6}}>
              {weather.forecast.map((d, idx) => (
                <div key={idx} style={{padding: 10, borderRadius: 6, background: "rgba(34,34,34,0.08)"}}>
                  <b>{d.day}</b><br/>
                  {d.temp}°C<br/>
                  <span style={{fontSize: "0.97em"}}>{d.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
