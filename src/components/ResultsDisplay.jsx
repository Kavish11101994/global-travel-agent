import './ResultsDisplay.css';

const ResultsDisplay = ({ results, searchParams }) => {
  if (!results) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  // Parse and format the markdown-style text from AI
  const formatContent = (text) => {
    const lines = text.split('\n');
    const formattedElements = [];
    let currentSection = null;
    let listItems = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines between sections
      if (!trimmedLine) {
        if (listItems.length > 0) {
          formattedElements.push(
            <ul key={`ul-${index}`} className="hotel-list">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        return;
      }

      // Main headers (###, ##, or numbered sections like "1.", "2.", "3.")
      if (trimmedLine.match(/^#{1,3}\s+(.+)/) || trimmedLine.match(/^\d+\.\s+(.+)/)) {
        if (listItems.length > 0) {
          formattedElements.push(
            <ul key={`ul-${index}`} className="hotel-list">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        
        let headerText = trimmedLine.replace(/^#{1,3}\s+/, '').replace(/^\d+\.\s+/, '');
        // Remove any ** from headers
        headerText = headerText.replace(/\*\*/g, '');
        
        // Check if this is the Travel Tips section
        const isTravelTips = headerText.toLowerCase().includes('travel tips');
        
        formattedElements.push(
          <h3 
            key={index} 
            className="section-header"
            style={isTravelTips ? {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              marginTop: '2rem',
              fontSize: '1.5rem',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            } : {}}
          >
            {isTravelTips && '💡 '}{headerText}
          </h3>
        );
      }
      // Hotel entries (starting with **)
      else if (trimmedLine.match(/^\*\*(.+?)\*\*/)) {
        if (listItems.length > 0) {
          formattedElements.push(
            <ul key={`ul-${index}`} className="hotel-list">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        
        const hotelName = trimmedLine.match(/^\*\*(.+?)\*\*/)[1];
        const rest = trimmedLine.replace(/^\*\*(.+?)\*\*/, '').trim();
        
        // Determine hotel category from the line
        let categoryClass = '';
        let categoryLabel = '';
        const fullLine = trimmedLine.toLowerCase();
        
        if (fullLine.includes('budget')) {
          categoryClass = 'hotel-budget';
          categoryLabel = 'Budget';
        } else if (fullLine.includes('mid-range') || fullLine.includes('midrange') || fullLine.includes('mid range')) {
          categoryClass = 'hotel-midrange';
          categoryLabel = 'Mid-Range';
        } else if (fullLine.includes('luxury') || fullLine.includes('premium')) {
          categoryClass = 'hotel-luxury';
          categoryLabel = 'Luxury';
        }
        
        formattedElements.push(
          <div key={index} className={`hotel-card ${categoryClass}`}>
            {categoryLabel && (
              <div style={{ 
                display: 'inline-block',
                fontSize: '0.85rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                marginBottom: '0.8rem',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: categoryClass === 'hotel-budget' ? '#10b981' : 
                       categoryClass === 'hotel-midrange' ? '#f59e0b' : '#8b5cf6',
                border: `2px solid ${categoryClass === 'hotel-budget' ? '#10b981' : 
                        categoryClass === 'hotel-midrange' ? '#f59e0b' : '#8b5cf6'}`
              }}>
                {categoryLabel}
              </div>
            )}
            <h4 style={{ 
              color: categoryClass === 'hotel-budget' ? '#047857' : 
                     categoryClass === 'hotel-midrange' ? '#d97706' : '#7c3aed',
              fontWeight: '800',
              fontSize: '1.4rem',
              margin: '0 0 0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {categoryClass === 'hotel-budget' ? '💰' : 
               categoryClass === 'hotel-midrange' ? '⭐' : '👑'} {hotelName}
            </h4>
            {rest && <p className="hotel-detail">{parseInlineFormatting(rest)}</p>}
          </div>
        );
        currentSection = index;
      }
      // Bullet points (-, *, or •)
      else if (trimmedLine.match(/^[-*•]\s+(.+)/)) {
        const content = trimmedLine.replace(/^[-*•]\s+/, '');
        const parsed = parseInlineFormatting(content);
        
        if (currentSection !== null) {
          // Add to the last hotel card
          const lastElement = formattedElements[formattedElements.length - 1];
          if (lastElement && lastElement.type === 'div' && lastElement.props.className === 'hotel-card') {
            listItems.push(
              <li key={`${index}-item`}>{parsed}</li>
            );
          } else {
            listItems.push(
              <li key={`${index}-item`}>{parsed}</li>
            );
          }
        } else {
          listItems.push(
            <li key={`${index}-item`}>{parsed}</li>
          );
        }
      }
      // Regular paragraph
      else {
        if (listItems.length > 0) {
          if (currentSection !== null) {
            // Append list to hotel card
            const lastElement = formattedElements[formattedElements.length - 1];
            if (lastElement && lastElement.type === 'div' && lastElement.props.className.includes('hotel-card')) {
              const categoryClass = lastElement.props.className;
              const categoryDiv = lastElement.props.children[0];
              const hotelNameH4 = lastElement.props.children[1];
              const detailP = lastElement.props.children[2];
              
              formattedElements[formattedElements.length - 1] = (
                <div key={currentSection} className={categoryClass}>
                  {categoryDiv}
                  {hotelNameH4}
                  {detailP}
                  <ul className="hotel-features">
                    {listItems}
                  </ul>
                </div>
              );
            }
          } else {
            formattedElements.push(
              <ul key={`ul-${index}`} className="hotel-list">
                {listItems}
              </ul>
            );
          }
          listItems = [];
          currentSection = null;
        }
        
        formattedElements.push(
          <p key={index} className="text-paragraph">{parseInlineFormatting(trimmedLine)}</p>
        );
      }
    });

    // Add any remaining list items
    if (listItems.length > 0) {
      if (currentSection !== null) {
        const lastElement = formattedElements[formattedElements.length - 1];
        if (lastElement && lastElement.type === 'div' && lastElement.props.className.includes('hotel-card')) {
          const categoryClass = lastElement.props.className;
          const categoryDiv = lastElement.props.children[0];
          const hotelNameH4 = lastElement.props.children[1];
          const detailP = lastElement.props.children[2];
          
          formattedElements[formattedElements.length - 1] = (
            <div key={currentSection} className={categoryClass}>
              {categoryDiv}
              {hotelNameH4}
              {detailP}
              <ul className="hotel-features">
                {listItems}
              </ul>
            </div>
          );
        }
      } else {
        formattedElements.push(
          <ul key={`ul-final`} className="hotel-list">
            {listItems}
          </ul>
        );
      }
    }

    return formattedElements;
  };

  // Parse inline formatting like **bold**
  const parseInlineFormatting = (text) => {
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;
    let key = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const boldText = match[1];
      const lowerText = boldText.toLowerCase();
      let color = '';
      let fontWeight = '700';
      
      // Check for flight classes
      if (lowerText.includes('economy')) {
        color = '#059669'; // Green
        fontWeight = '800';
      } else if (lowerText.includes('business')) {
        color = '#dc2626'; // Red
        fontWeight = '800';
      } else if (lowerText.includes('first class') || lowerText.includes('first-class')) {
        color = '#7c3aed'; // Purple
        fontWeight = '800';
      }
      // Check for airlines
      else if (lowerText.includes('air ') || lowerText.includes('airways') || lowerText.includes('airlines') || 
               lowerText.includes('jet') || lowerText.includes('indigo') || lowerText.includes('spicejet') ||
               lowerText.includes('vistara') || lowerText.includes('lufthansa') || lowerText.includes('emirates') ||
               lowerText.includes('qatar') || lowerText.includes('british') || lowerText.includes('american') ||
               lowerText.includes('delta') || lowerText.includes('united') || lowerText.includes('etihad') ||
               lowerText.includes('singapore') || lowerText.includes('cathay')) {
        color = '#2563eb'; // Blue
        fontWeight = '800';
      }
      
      // Add bold text with inline styles
      if (color) {
        parts.push(
          <strong key={key++} style={{ color: color, fontWeight: fontWeight }}>
            {boldText}
          </strong>
        );
      } else {
        parts.push(<strong key={key++}>{boldText}</strong>);
      }
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>🎯 Your Travel Plan</h2>
        <div className="search-summary">
          <span className="summary-item">🛫 {searchParams.origin} → 🛬 {searchParams.location}</span>
          <span className="summary-item">📅 {formatDate(searchParams.checkIn)} → {formatDate(searchParams.checkOut)}</span>
          <span className="summary-item">🌙 {calculateNights()} nights</span>
          <span className="summary-item">👥 {searchParams.guests} guest{searchParams.guests > 1 ? 's' : ''}</span>
          <span className="summary-item">🛏️ {searchParams.rooms} room{searchParams.rooms > 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="ai-response">
        <div className="response-header">
          <span className="ai-badge">✨ Smart Flight & Hotel Recommendations</span>
        </div>
        <div className="response-content">
          {formatContent(results)}
        </div>
      </div>

      <div className="results-footer">
        <p>💡 Flight and hotel recommendations are AI-generated based on your search. Please verify availability, pricing, and book through official airline and hotel websites or trusted travel agencies.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
