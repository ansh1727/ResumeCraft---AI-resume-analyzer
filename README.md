# 🚀 ResumeCraft - AI Resume Analyzer

ResumeCraft is an AI-powered Resume Analyzer built using the MERN Stack that helps candidates evaluate and improve their resumes using Artificial Intelligence.

The platform analyzes resumes, calculates ATS scores, identifies missing skills, provides improvement suggestions, and matches resumes against job descriptions.

---

## 🌐 Live Demo

### Frontend

https://resume-craft-ai-resume-analyzer.vercel.app

### Backend API

https://resumecraft-backend-cuw5.onrender.com

---
## Screenshots

## Dashboard 
<img width="1440" height="900" alt="Screenshot 2026-06-14 at 5 19 33 AM" src="https://github.com/user-attachments/assets/42994d5e-fc8e-460a-b435-5a510f3505d6" />

## Resume Upload
<img width="1440" height="900" alt="Screenshot 2026-06-14 at 5 19 49 AM" src="https://github.com/user-attachments/assets/12eb124f-4575-421e-b28c-f343fca4a6c1" />

## resume History
<img width="1440" height="900" alt="Screenshot 2026-06-14 at 5 19 56 AM" src="https://github.com/user-attachments/assets/3d94137d-4abd-49f6-852b-01f5a3fa1098" />

## Analysis
<img width="1440" height="900" alt="Screenshot 2026-06-14 at 5 20 10 AM" src="https://github.com/user-attachments/assets/f5aedbf5-1d85-40b8-aa5e-954b8cef4659" />


## 📌 Features

### Candidate Features

* User Registration & Login
* JWT Authentication
* Upload Resume (PDF)
* Resume Parsing
* ATS Score Analysis
* AI-Powered Resume Evaluation
* Skill Gap Detection
* Resume History
* Job Description Matching
* Personalized Recommendations

### Recruiter Features

* Create Job Posts
* Manage Jobs
* View Applicants
* Compare Candidate Profiles
* Candidate Match Score Evaluation

### Admin Features

* User Management
* Job Management
* Platform Analytics
* System Monitoring

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt

### File Upload

* Multer
* PDF Parser

### Artificial Intelligence

* Google Gemini API

### Deployment

* Vercel
* Render
* MongoDB Atlas

---

## 📂 Project Structure

```bash
ResumeCraft/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

```text
User Register
      ↓
Password Hashing (bcrypt)
      ↓
MongoDB Storage
      ↓
Login
      ↓
JWT Token Generation
      ↓
Protected Routes
```

---

## 📄 Resume Processing Flow

```text
Upload Resume
      ↓
PDF Parsing
      ↓
Extract Resume Data
      ↓
Store in MongoDB
      ↓
Generate Analysis
      ↓
Display Results
```

---

## 🤖 AI Analysis Features

ResumeCraft analyzes:

* ATS Score
* Technical Skills
* Project Quality
* Resume Formatting
* Employability Score

The system also provides:

* Missing Skills
* Weak Sections
* Improvement Suggestions
* Recommended Technologies
* Recommended Projects
* Recommended Certifications

---

## 🗄 Database Collections

### Users

Stores:

* Name
* Email
* Password
* Role

### Resumes

Stores:

* Uploaded Resume
* Extracted Information
* Resume Metadata

### Analyses

Stores:

* ATS Score
* Skill Evaluation
* Recommendations
* AI Analysis Results

### Jobs

Stores:

* Job Details
* Recruiter Information

### Applications

Stores:

* Candidate Applications
* Match Scores

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/ansh1727/ResumeCraft---AI-resume-analyzer.git
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## ⚙ Environment Variables

### Backend

Create a `.env` file inside backend:

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_key

CLIENT_URL=http://localhost:5173

MAX_FILE_SIZE=5242880
```

---

## 📈 Future Enhancements

* Resume Builder
* Cover Letter Generator
* AI Interview Questions
* Resume Templates
* LinkedIn Profile Analysis
* Email Notifications
* Advanced Recruiter Dashboard

---

## 🎯 Learning Outcomes

This project demonstrates:

* Full Stack Development
* REST API Development
* JWT Authentication
* MongoDB Database Design
* File Upload Handling
* AI Integration
* Cloud Deployment
* MERN Stack Development

---

## 👨‍💻 Author

**Ansh Pathak**

GitHub:
https://github.com/ansh1727
