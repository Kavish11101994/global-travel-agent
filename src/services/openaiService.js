import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend API
});

export const searchHotels = async (searchParams) => {
  try {
    const { origin, location, checkIn, checkOut, guests, rooms } = searchParams;
    
    // Calculate number of nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const prompt = `As a professional travel agent, please provide detailed travel recommendations for the following trip:

Origin: ${origin}
Destination: ${location}
Check-in: ${checkIn}
Check-out: ${checkOut}
Duration: ${nights} night${nights > 1 ? 's' : ''}
Guests: ${guests}
Rooms: ${rooms}

Please provide:

1. FLIGHT RECOMMENDATIONS (${origin} to ${location}):
   - Recommend 2-3 airlines operating this route
   - Flight date: ${checkIn}
   - For EACH airline, provide:
     * Airline name header in bold
     * Typical flight timings (departure and arrival times based on ${checkIn})
     * Flight duration
     * ALL THREE classes with individual pricing (DO NOT repeat airline name with class):
       - **Economy Class** with price
       - **Business Class** with price
       - **First Class** with price
   - Approximate round-trip fares in BOTH local currency AND Indian Rupees (₹) for each class
   - Layover information if applicable
   - Best time to book for better prices

2. HOTEL RECOMMENDATIONS in ${location}:
   - 3-5 hotel options with different price ranges (budget, mid-range, luxury)
   - For each hotel, include:
     * Hotel name and star rating
     * Category (Budget/Mid-range/Luxury) - MUST use one of these exact words in bold
     * Approximate price range per night in BOTH the local currency of ${location} AND Indian Rupees (₹)
     * Key amenities and features
     * Location/neighborhood information
     * Why it's recommended for this trip

3. TRAVEL TIPS for visiting ${location}:
   - Best areas to stay
   - Local transportation options
   - Must-visit attractions
   - Any visa or travel requirements for Indian travelers
   - Best time to visit
   - Local cuisine recommendations
   - Safety tips and precautions

IMPORTANT FORMATTING:
- TRAVEL TIPS section is MANDATORY - You MUST provide at least 5-7 travel tips
- Each travel tip should be a bullet point with detailed information

IMPORTANT PRICING FORMAT:
- Flights: Put airline and class in bold like **Air India: Economy Class** or **Emirates: Business Class**
- Flights: "$800-$1,200 round-trip (₹66,000-₹99,000)" or "€700-€1,000 round-trip (₹63,000-₹90,000)"
- Hotels: "$100-$150 per night (₹8,000-₹12,000)" or "€80-€120 per night (₹7,200-₹10,800)"
- Always show local currency first, then Indian Rupee equivalent in parentheses
- Use current exchange rates for accurate conversion
- Make sure Economy Class, Business Class, and First Class are always in bold with **

Format the response in a clear, readable way with proper sections and bullet points.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an experienced travel agent specializing in flight and hotel recommendations for Indian travelers. CRITICAL: For flights, recommend 2-3 airlines. For EACH airline, format as follows: 1) Airline name as a header in bold, 2) Flight timings and duration, 3) List only the class names (NOT "Airline Name: Class") - use **Economy Class**, **Business Class**, **First Class** with individual prices. Example: "**Air India** - Departure: 10:30 AM, Arrival: 2:45 PM (Duration: 4h 15m) - **Economy Class** $500-$700 (₹41,000-₹58,000), **Business Class** $1,200-$1,500 (₹99,000-₹1,24,000), **First Class** $2,000-$2,500 (₹1,65,000-₹2,06,000)". Always display prices in BOTH local currency AND Indian Rupees (₹). Use current exchange rates for accurate conversions. MANDATORY: You MUST include a detailed TRAVEL TIPS section with at least 6-8 practical tips about the destination including best areas to stay, local transportation, must-visit attractions, visa requirements, best time to visit, local cuisine, and safety tips.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw new Error(error.message || 'Failed to get hotel recommendations. Please check your API key and try again.');
  }
};
