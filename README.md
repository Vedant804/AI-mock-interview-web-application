# AI Mock Interview Web Application

An AI-powered solution designed to help users simulate and prepare for real-world job interviews. Built using **Gemini AI**, the application generates role-specific questions based on job descriptions, records user responses through webcam and microphone, and delivers insightful feedback using AI. It enhances both technical and communication skills through realistic mock interviews and performance tracking.

## Features

- 🔐 User Authentication via **Clerk**
- 📋 Add Job Title & Experience to generate relevant questions
- 🧠 **Gemini AI**-powered interview question generation
- 🎙️ Real-time **Webcam & Audio Recording**
- 🗣️ **Text-to-Speech** for question narration
- ✍️ **Filler word detection** (e.g., “uhh”, “you know”)
- 📊 **AI-generated feedback** and performance tracking
- 🧾 Feedback stored securely in **PostgreSQL**

## Tech Stack
| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | Next.js                   |
| Backend      | API routes (Next.js)      |
| AI Integration | Gemini AI API           |
| Database     | PostgreSQL                |
| Auth         | Clerk                     |

---

## 🧪 Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/Vedant804/AI-mock-interview-web-application.git
   cd ai-mock-interviewer
   
2 **Install Dependencies**
   ```bash
   npm install
```
3 **Create .env.local and add:**
   ```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
```
4 **Start the dev server**
   ```bash
npm run dev
```

## Screenshots

1 **User Authentication**

![User Authentication](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss1.png?raw=true)

2 **Dashboard**

![Dashboard](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss2.png?raw=true)

3 **Job Title Input**

![Job Title Input](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss3.png?raw=true)

4 **AI Question Generation**

![AI Question Generation](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss4.png?raw=true)

5 **Feedback Dashboard**

![Feedback Dashboard](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss5.png?raw=true)

![Filler words detection](https://github.com/Vedant804/AI-mock-interview-web-application/blob/main/ai-mock-interviewer/public/ss6.png?raw=true)








