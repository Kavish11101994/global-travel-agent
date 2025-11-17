# Global Travel Agent 🏨

A modern React application for searching hotel itineraries powered by OpenAI. This app provides AI-powered hotel recommendations based on location, dates, number of guests, and rooms.

## Features

- 🔍 **Intelligent Search**: Search hotels by location, check-in/check-out dates, number of guests, and rooms
- 🤖 **AI-Powered Recommendations**: Get personalized hotel suggestions using OpenAI's GPT model
- 🎨 **Modern UI Design**: Beautiful gradient design with responsive layout
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and build times

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Next-generation frontend tooling
- **OpenAI API**: AI-powered hotel recommendations
- **CSS3**: Custom styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+) - **Note: Current Node.js v20.11.0 may have compatibility issues with Vite 7**
- npm or yarn
- OpenAI API key

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd global-travel-agent
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

   > **Get your OpenAI API key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys) to create an API key

### Running the Application

**Note**: Due to Node.js version compatibility issues with Vite 7, you may need to upgrade Node.js or use an alternative approach.

**Option 1: Upgrade Node.js (Recommended)**
```bash
# Download and install Node.js 20.19+ or 22.12+ from https://nodejs.org/
```

**Option 2: Run with current Node.js (may have issues)**
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Usage

1. **Enter Destination**: Type the city or location where you want to stay
2. **Select Dates**: Choose your check-in and check-out dates
3. **Specify Guests & Rooms**: Enter the number of guests and rooms needed
4. **Search**: Click the "Search Hotels" button
5. **View Results**: Get AI-powered hotel recommendations with detailed information

## Project Structure

```
global-travel-agent/
├── src/
│   ├── components/
│   │   ├── HotelSearchForm.jsx      # Search form component
│   │   ├── HotelSearchForm.css      # Search form styles
│   │   ├── ResultsDisplay.jsx       # Results display component
│   │   └── ResultsDisplay.css       # Results styles
│   ├── services/
│   │   └── openaiService.js         # OpenAI API integration
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App styles
│   └── main.jsx                     # Entry point
├── .env.example                     # Environment variables template
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Important Notes

- **API Key Security**: The current implementation uses `dangerouslyAllowBrowser: true` for the OpenAI client. In production, you should:
  - Create a backend API to handle OpenAI requests
  - Never expose your API key in the frontend
  - Use environment variables properly

- **Node.js Version**: This project requires Node.js 20.19+ or 22.12+ due to Vite 7 requirements

- **Cost**: Using the OpenAI API incurs costs. Monitor your usage at [OpenAI Platform](https://platform.openai.com/usage)

## Troubleshooting

### "crypto.hash is not a function" Error
This error occurs when Node.js version is below 20.19. Please upgrade Node.js to the required version.

### API Key Issues
- Ensure your `.env` file is created and contains your API key
- Verify the API key is valid and has credits
- Check that the environment variable name is `VITE_OPENAI_API_KEY`

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- [ ] Add backend API for secure OpenAI integration
- [ ] Implement hotel booking integration
- [ ] Add user authentication
- [ ] Save favorite hotels
- [ ] Add map integration
- [ ] Support multiple languages
- [ ] Add price comparison features

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
