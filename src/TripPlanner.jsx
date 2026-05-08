import { useState } from "react";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const handleGenerateTrip = async () => {
    if (!destination || !budget || !days) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setItinerary("");

    try {
      const response = await fetch("https://ai-trip-backend-628807958232.asia-south1.run.app/api/trips/plan/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          budget,
          days,
        }),
      });

   const data = await response.text();

const cleanedData = data
  .replace(/data:/g, "")
  .replace(/\*\*/g, "")
  .replace(/\*/g, "•")
  .replace(/\+/g, "→")
  .trim();

setItinerary(cleanedData);
    } catch (error) {
      setItinerary("Error generating trip. Check backend connection.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Trip Planner</h1>

      <div className="form-box">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter budget (e.g. Standard, Luxury)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <button onClick={handleGenerateTrip} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </div>

      {itinerary && (
        <div className="result-box">
          <h2>Your Itinerary</h2>
          <pre>{itinerary}</pre>
        </div>
      )}
    </div>
  );
}

export default TripPlanner;