import { useState } from 'react';
import './HotelSearchForm.css';

const HotelSearchForm = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState({
    origin: '',
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="search-form-container">
      <div className="search-form-header">
        <h1>🏨 Smart Travel Agent</h1>
        <p>Find your perfect hotel with smart recommendation engine</p>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="origin">
              <span className="icon">🛫</span>
              Origin (Your City)
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g., Mumbai, Delhi, Bangalore"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <span className="icon">🛬</span>
              Destination
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Paris, New York, Tokyo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkIn">
              <span className="icon">📅</span>
              Check-in Date
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkOut">
              <span className="icon">📅</span>
              Check-out Date
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              min={formData.checkIn || today}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              <span className="icon">👥</span>
              Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max="20"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rooms">
              <span className="icon">🛏️</span>
              Rooms
            </label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Searching...
            </>
          ) : (
            <>
              <span className="icon">🔍</span>
              Search Hotels
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;
