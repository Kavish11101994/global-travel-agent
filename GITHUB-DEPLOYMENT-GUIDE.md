# Step-by-Step Guide: GitHub & Vercel Deployment

## Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Open your browser and go to [github.com](https://github.com)
   - Sign in (or create an account if you don't have one)

2. **Create New Repository:**
   - Click the **+** icon in the top right corner
   - Select **"New repository"**
   
3. **Repository Settings:**
   - Repository name: `global-travel-agent` (or any name you want)
   - Description: "AI-powered travel agent for flight and hotel recommendations"
   - Keep it **Public** (or Private if you prefer)
   - **DO NOT** check "Initialize this repository with a README"
   - Click **"Create repository"**

4. **Copy the Repository URL:**
   - After creating, you'll see a URL like:
     `https://github.com/YOUR_USERNAME/global-travel-agent.git`
   - Keep this page open, we'll need it

## Step 2: Push Your Code to GitHub

Open PowerShell in your project folder and run these commands one by one:

### 2.1 Initialize Git Repository
```powershell
cd C:\Users\shahi\OneDrive\Desktop\global-travel-agent
git init
```

### 2.2 Add All Files
```powershell
git add .
```

### 2.3 Commit Your Code
```powershell
git commit -m "Initial commit - Global Travel Agent"
```

### 2.4 Set Main Branch
```powershell
git branch -M main
```

### 2.5 Connect to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/global-travel-agent.git
```

### 2.6 Push to GitHub
```powershell
git push -u origin main
```

**If asked for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)
  - To create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Give it "repo" permissions
  - Copy the token and use it as password

## Step 3: Deploy to Vercel

### 3.1 Go to Vercel
- Open [vercel.com](https://vercel.com) in your browser

### 3.2 Sign Up/Sign In
- Click **"Sign Up"** (or "Login" if you have an account)
- Choose **"Continue with GitHub"**
- Authorize Vercel to access your GitHub

### 3.3 Import Your Project
- Click **"Add New..."** → **"Project"**
- You'll see a list of your GitHub repositories
- Find **"global-travel-agent"** and click **"Import"**

### 3.4 Configure Project
- **Framework Preset:** Should auto-detect as "Vite" (if not, select it)
- **Root Directory:** Leave as `./`
- **Build Command:** `npm run build` (should be pre-filled)
- **Output Directory:** `dist` (should be pre-filled)

### 3.5 Add Environment Variable (CRITICAL!)
Before clicking Deploy:
- Click **"Environment Variables"** section
- Add variable:
  - **Name:** `VITE_OPENAI_API_KEY`
  - **Value:** Paste your OpenAI API key (the one from your `.env` file)
  - Click **"Add"**

### 3.6 Deploy!
- Click **"Deploy"** button
- Wait 2-3 minutes while Vercel builds and deploys
- You'll see a success message with your live URL!

## Step 4: Access Your Live App

Once deployment is complete:
- Your app will be live at: `https://global-travel-agent-xxx.vercel.app`
- Vercel will show you the URL
- Click it to open your live travel agent app!

## Troubleshooting

### Git Push Fails
**Error: "Support for password authentication was removed"**
- You need a Personal Access Token instead of password
- Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Give it a name: "Vercel Deployment"
- Check "repo" permissions
- Click "Generate token"
- Copy the token (you won't see it again!)
- Use this token as your password when git asks

### Deployment Fails
1. Check that environment variable `VITE_OPENAI_API_KEY` is set
2. Go to Vercel dashboard → Your project → Settings → Environment Variables
3. Verify the key is there
4. If not, add it and redeploy

### App Shows Errors
- Make sure your OpenAI API key is valid
- Check it has credits: https://platform.openai.com/usage
- Verify the environment variable name is exactly: `VITE_OPENAI_API_KEY`

## After Successful Deployment

✅ Your app is live!
✅ Share the URL with anyone
✅ Every time you push to GitHub, Vercel auto-deploys
✅ You can set up a custom domain in Vercel settings

---

Need help at any step? Let me know which step you're on!
