import { useState } from 'react';
import './ItineraryPanel.css';

const ItineraryPanel = ({ searchParams, rawResults }) => {
  const [itinerary, setItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!searchParams) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 0;
    const start = new Date(searchParams.checkIn);
    const end = new Date(searchParams.checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    
    // Simulate AI generation - in real app, this would call OpenAI again
    setTimeout(() => {
      const nights = calculateNights();
      const days = [];
      
      for (let i = 0; i <= nights; i++) {
        const currentDate = new Date(searchParams.checkIn);
        currentDate.setDate(currentDate.getDate() + i);
        
        let dayPlan = {};
        
        if (i === 0) {
          // Day 1 - Arrival
          dayPlan = {
            day: i + 1,
            date: formatDate(currentDate),
            title: `Day ${i + 1}: Arrival in ${searchParams.location}`,
            activities: [
              { time: 'Morning', activity: `Depart from ${searchParams.origin}`, icon: '✈️', type: 'travel' },
              { time: 'Afternoon', activity: `Arrive at ${searchParams.location} & Check-in to hotel`, icon: '🏨', type: 'hotel' },
              { time: 'Evening', activity: 'Local snacks tasting - Try street food at popular market', icon: '🥘', type: 'food' },
              { time: 'Night', activity: 'Welcome dinner at rooftop restaurant with city views', icon: '🍽️', type: 'food' }
            ]
          };
        } else if (i === nights) {
          // Last day - Departure
          dayPlan = {
            day: i + 1,
            date: formatDate(currentDate),
            title: `Day ${i + 1}: Departure Day`,
            activities: [
              { time: 'Morning', activity: 'Hotel check-out & breakfast at local cafe', icon: '☕', type: 'food' },
              { time: 'Afternoon', activity: 'Last-minute shopping at central market for souvenirs', icon: '🛍️', type: 'shopping' },
              { time: 'Evening', activity: `Head to airport - Depart from ${searchParams.location}`, icon: '✈️', type: 'travel' },
              { time: 'Night', activity: `Arrive back in ${searchParams.origin}`, icon: '🏠', type: 'travel' }
            ]
          };
        } else {
          // Middle days - Exploration with variety
          const morningActivities = [
            { activity: 'Visit iconic landmarks and historical monuments', icon: '🏛️', type: 'place' },
            { activity: 'Explore ancient temples and religious sites', icon: '⛩️', type: 'place' },
            { activity: 'Museum tour - Art, culture and history exhibits', icon: '🖼️', type: 'place' },
            { activity: 'Morning heritage walk through old city quarters', icon: '🚶', type: 'place' }
          ];
          
          const afternoonActivities = [
            { activity: 'Lunch at authentic local restaurant - Must-try regional dishes', icon: '🍴', type: 'food' },
            { activity: 'Traditional cooking class - Learn local cuisine', icon: '👨‍🍳', type: 'cultural' },
            { activity: 'Street food tour - Sample famous local snacks', icon: '🍜', type: 'food' }
          ];
          
          const eveningActivities = [
            { activity: 'Cultural show - Traditional dance & music performance', icon: '🎭', type: 'cultural' },
            { activity: 'Handicraft market shopping - Local artisan products', icon: '🎨', type: 'shopping' },
            { activity: 'Sunset at scenic viewpoint with local tea/snacks', icon: '🌅', type: 'place' },
            { activity: 'Shopping district - Textiles, spices, and local crafts', icon: '🛍️', type: 'shopping' }
          ];
          
          const nightActivities = [
            { activity: 'Dinner at popular local eatery - Chef specials', icon: '🍛', type: 'food' },
            { activity: 'Night market exploration - Street food & shopping', icon: '🌃', type: 'shopping' },
            { activity: 'Evening river cruise or harbor tour with dinner', icon: '⛴️', type: 'cultural' }
          ];
          
          // Rotate activities based on day number for variety
          const morningIdx = (i - 1) % morningActivities.length;
          const afternoonIdx = (i - 1) % afternoonActivities.length;
          const eveningIdx = (i - 1) % eveningActivities.length;
          const nightIdx = (i - 1) % nightActivities.length;
          
          dayPlan = {
            day: i + 1,
            date: formatDate(currentDate),
            title: `Day ${i + 1}: Explore ${searchParams.location}`,
            activities: [
              { time: 'Morning', ...morningActivities[morningIdx] },
              { time: 'Afternoon', ...afternoonActivities[afternoonIdx] },
              { time: 'Evening', ...eveningActivities[eveningIdx] },
              { time: 'Night', ...nightActivities[nightIdx] }
            ]
          };
        }
        
        days.push(dayPlan);
      }
      
      setItinerary(days);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="itinerary-panel">
      <div className="itinerary-header">
        <h2>📋 Your Itinerary</h2>
        <p className="itinerary-subtitle">
          {searchParams.origin} → {searchParams.location}
        </p>
        <p className="itinerary-dates">
          {formatDate(searchParams.checkIn)} to {formatDate(searchParams.checkOut)}
        </p>
        <p className="itinerary-nights">
          {calculateNights()} Night{calculateNights() > 1 ? 's' : ''} • {searchParams.guests} Guest{searchParams.guests > 1 ? 's' : ''}
        </p>
        <div className="itinerary-summary">
          <div className="summary-badge">🍽️ Local Cuisine</div>
          <div className="summary-badge">🏛️ Must-Visit Places</div>
          <div className="summary-badge">🎭 Cultural Shows</div>
          <div className="summary-badge">🛍️ Shopping</div>
        </div>
      </div>

      {!itinerary ? (
        <div className="itinerary-generate">
          <button 
            onClick={generateItinerary} 
            disabled={isGenerating}
            className="generate-btn"
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              <>
                ✨ Generate Day-by-Day Itinerary
              </>
            )}
          </button>
          <p className="generate-hint">
            Get a detailed daily plan for your trip
          </p>
        </div>
      ) : (
        <div className="itinerary-content">
          {itinerary.map((day) => (
            <div key={day.day} className="day-card">
              <div className="day-header">
                <div className="day-number">{day.day}</div>
                <div className="day-info">
                  <h3>{day.title}</h3>
                  <p className="day-date">{day.date}</p>
                </div>
              </div>
              <div className="day-activities">
                {day.activities.map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <span className="activity-icon">{activity.icon}</span>
                    <div className="activity-details">
                      <span className="activity-time">{activity.time}</span>
                      <span className="activity-text">{activity.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setItinerary(null)} 
            className="regenerate-btn"
          >
            🔄 Regenerate Itinerary
          </button>
        </div>
      )}

      <div className="itinerary-footer">
        <p>💡 This is a suggested itinerary. Feel free to customize based on your preferences!</p>
      </div>
    </div>
  );
};

export default ItineraryPanel;
