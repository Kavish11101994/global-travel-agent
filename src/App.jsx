import { useState } from 'react';
import HotelSearchForm from './components/HotelSearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import ItineraryPanel from './components/ItineraryPanel';
import { searchHotels } from './services/openaiService';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const hotelResults = await searchHotels(formData);
      setResults(hotelResults);
      setSearchParams(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <HotelSearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {results && (
          <div className="results-layout">
            <div className="results-main">
              <ResultsDisplay results={results} searchParams={searchParams} />
            </div>
            <div className="results-sidebar">
              <ItineraryPanel searchParams={searchParams} rawResults={results} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
