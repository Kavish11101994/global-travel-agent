# Deploying Global Travel Agent to Vercel

## Quick Deployment Steps

### Option 1: Deploy via Vercel Website (Easiest)

1. **Push your code to GitHub:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - Global Travel Agent"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/global-travel-agent.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `global-travel-agent` repository
   - Vercel will auto-detect Vite settings
   - Add environment variable:
     - Name: `VITE_OPENAI_API_KEY`
     - Value: Your OpenAI API key
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel
   ```
   - Follow the prompts
   - Select "yes" for default settings
   - Add environment variable when prompted:
     - `VITE_OPENAI_API_KEY=your_api_key_here`

4. **Deploy to Production:**
   ```powershell
   vercel --prod
   ```

## Important: Environment Variables

Before deploying, you MUST add your OpenAI API key as an environment variable in Vercel:

**In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name:** `VITE_OPENAI_API_KEY`
   - **Value:** Your OpenAI API key (starts with `sk-`)
   - **Environment:** Production, Preview, Development (select all)
4. Click "Save"

## Project Configuration

The project is already configured for Vercel deployment:
- ✅ `vercel.json` created
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite (auto-detected)

## After Deployment

Your app will be live at: `https://your-project-name.vercel.app`

You can:
- Share the URL with others
- Set up a custom domain in Vercel settings
- Enable automatic deployments on git push

## Troubleshooting

**Build Fails:**
- Ensure all dependencies are in `package.json`
- Check that `VITE_OPENAI_API_KEY` is set in environment variables

**API Key Issues:**
- Make sure the environment variable name is exactly `VITE_OPENAI_API_KEY`
- Redeploy after adding environment variables

**Node.js Version Warning:**
- Vercel uses Node.js 18+ by default, which is compatible
- If issues occur, specify Node version in `package.json`:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

## Security Note

⚠️ **Important:** The current implementation uses `dangerouslyAllowBrowser: true` which exposes your API key in the browser. For production:

1. Consider creating a backend API to handle OpenAI requests
2. Use Vercel Serverless Functions to keep your API key secure
3. Implement rate limiting to prevent abuse

For now, monitor your OpenAI API usage at: https://platform.openai.com/usage

---

Ready to deploy! 🚀
