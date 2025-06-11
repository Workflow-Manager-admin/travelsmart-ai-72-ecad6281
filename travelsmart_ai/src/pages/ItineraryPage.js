import React, { useState } from "react";

// PUBLIC_INTERFACE
function ItineraryPage() {
  /**
   * Itinerary Page - Personalized AI travel planner.
   * User enters preferences; on submit, calls mock AI API, and displays itinerary.
   */
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: "",
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Simulate calling an AI endpoint (replace with real API as needed)
  function fetchAIGeneratedItinerary(userInput) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { day: 1, details: `Arrive in ${userInput.destination}. Explore downtown and local cuisine. Check in to hotel.` },
          { day: 2, details: `Visit top attractions based on your interests: ${userInput.preferences || "general sightseeing"}.` },
          { day: 3, details: `Leisure day: Enjoy activities for your budget (${userInput.budget || "standard"}).` },
          { day: 4, details: "Shopping or cultural tour. Evening at a local event or market." },
          { day: 5, details: "Pack up, last walk around, and departure." },
        ]);
      }, 1500);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    setError("");
    try {
      // Would use actual fetch to AI backend here
      const result = await fetchAIGeneratedItinerary(form);
      setItinerary(result);
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="hero">
        <div className="subtitle">AI Itinerary Generator</div>
        <h1 className="title">Create Your Perfect Trip</h1>
        <div className="description" style={{ marginBottom: 32 }}>
          Fill in your details and let our AI craft your personalized travel plan.
        </div>
        <form className="itinerary-form" onSubmit={handleSubmit} style={{maxWidth: 400, margin: "0 auto"}}>
          <div style={{marginBottom: 16}}>
            <label>Destination<br/>
              <input
                name="destination"
                required
                style={{width: "100%", padding: 8, fontSize: 16, marginTop: 4}}
                value={form.destination}
                placeholder="City, Country"
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{display: "flex", gap: "16px", marginBottom: 16}}>
            <label style={{flex: 1}}>Start Date<br/>
              <input
                type="date"
                name="startDate"
                required
                style={{width: "100%", padding: 8, fontSize: 16, marginTop: 4}}
                value={form.startDate}
                onChange={handleChange}
              />
            </label>
            <label style={{flex: 1}}>End Date<br/>
              <input
                type="date"
                name="endDate"
                required
                style={{width: "100%", padding: 8, fontSize: 16, marginTop: 4}}
                value={form.endDate}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{marginBottom: 16}}>
            <label>Budget<br/>
              <select
                name="budget"
                required
                style={{width: "100%", padding: 8, fontSize: 16, marginTop: 4}}
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low ($)</option>
                <option value="medium">Medium ($$)</option>
                <option value="high">High ($$$)</option>
              </select>
            </label>
          </div>
          <div style={{marginBottom: 16}}>
            <label>Preferences<br/>
              <input
                name="preferences"
                style={{width: "100%", padding: 8, fontSize: 16, marginTop: 4}}
                value={form.preferences}
                placeholder="e.g. museums, adventure, beaches"
                onChange={handleChange}
              />
            </label>
          </div>
          <button className="btn btn-large" type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        </form>
        {error && (
          <div style={{ color: "#f39512", marginTop: 18, textAlign: "center" }}>
            {error}
          </div>
        )}
        {itinerary && (
          <div style={{marginTop: 32, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 24, maxWidth: 420, marginLeft: "auto", marginRight: "auto"}}>
            <h3 style={{color: "var(--base-light)", textAlign: "center"}}>Your AI-Generated Plan</h3>
            <ol>
              {itinerary.map((item) => (
                <li key={item.day} style={{marginBottom: 18, lineHeight: 1.5}}>
                  <b>Day {item.day}:</b> {item.details}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItineraryPage;
