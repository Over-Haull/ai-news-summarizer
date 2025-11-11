# 📰 AI News Summarizer

A sleek React-based web app that uses Hugging Face’s **BART-large-CNN** transformer model to summarize long news articles into concise AI-generated summaries.

🚀 **Live Demo:** [ai-news-summarizer.vercel.app](https://ai-news-summarizer-pi.vercel.app/)

---

## ⚙️ Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Vercel Serverless Functions (`/api/summarize.js`)
- **AI Model:** `facebook/bart-large-cnn` (via Hugging Face Inference API)
- **Deployment:** Vercel (with secure environment variables)

---

## ✨ Features
✅ Paste any article or paragraph to get a short AI summary  
✅ Choose summary length: Short • Medium • Detailed  
✅ Responsive UI + live typing animation for the summary  
✅ “How It Works” section explaining model and architecture  
✅ Copy-to-clipboard functionality  
✅ Deployed securely on Vercel with token privacy  

---

## 🧠 How It Works
1. The user enters an article or text snippet.  
2. The app sends the text to a **Vercel API route** (`/api/summarize`) instead of exposing the API key.  
3. The API route securely connects to Hugging Face’s inference endpoint.  
4. The BART model returns a concise summary based on the chosen length.  

---

## 🛠 Setup Instructions (Local)
Clone and install dependencies:
```bash
git clone https://github.com/Over-Haull/ai-news-summarizer.git
cd ai-news-summarizer/frontend
npm install
Create a .env file for local testing:
REACT_APP_HF_TOKEN=your_huggingface_token

Run locally:
npm start
🌐 Deployment
Hosted on Vercel

Environment variable HF_TOKEN stored securely in Vercel’s dashboard

API routes handled by Vercel Functions


🧾 License
MIT License © 2025 Over-Haull


