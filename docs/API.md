# ResumeCraft - AI Resume Analyzer

## Overview

ResumeCraft is a full-stack AI-powered Resume Analyzer built using the MERN Stack. The platform helps job seekers improve their resumes, understand their strengths and weaknesses, and evaluate how well their resumes match specific job descriptions.

The application uses Artificial Intelligence to analyze uploaded resumes, calculate ATS scores, identify missing skills, and provide personalized recommendations for improving employability.

The goal of this project is to simulate a real-world recruitment ecosystem where candidates, recruiters, and administrators interact on a single platform.

---

# Problem Statement

Many candidates apply for jobs without knowing whether their resumes are ATS-friendly or whether they match the requirements of a job description.

ResumeCraft solves this problem by:

* Analyzing resumes automatically
* Calculating ATS compatibility scores
* Identifying missing skills
* Suggesting improvements
* Matching resumes against job descriptions
* Helping recruiters evaluate candidates more efficiently

---

# Key Features

## Candidate Features

* User Registration and Login
* Secure JWT Authentication
* Upload Resume (PDF)
* Resume Parsing
* AI Resume Analysis
* ATS Score Generation
* Resume History
* Job Description Matching
* Personalized Suggestions
* Recommended Technologies
* Recommended Certifications
* Job Applications

---

## Recruiter Features

* Recruiter Authentication
* Create Job Posts
* Edit Job Posts
* Delete Job Posts
* Manage Posted Jobs
* View Applicants
* View Resume Analysis Reports
* Compare Candidate Match Scores

---

## Admin Features

* Manage Users
* Manage Jobs
* Platform Statistics
* Monitor System Activity
* Delete Users
* Delete Job Posts

---

# Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* Helmet
* CORS
* Rate Limiting

## File Handling

* Multer
* PDF Parser

## Artificial Intelligence

* Google Gemini API

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# How the System Works

### Step 1: User Registration

A candidate creates an account and securely logs into the platform.

### Step 2: Resume Upload

The candidate uploads a PDF resume.

### Step 3: Resume Parsing

The system extracts important information including:

* Name
* Email
* Phone Number
* Skills
* Education
* Projects
* Experience
* Certifications

### Step 4: AI Analysis

The extracted resume data is sent to Google Gemini AI.

The AI evaluates:

* ATS Score
* Technical Skills
* Project Quality
* Resume Formatting
* Employability Score

### Step 5: Recommendations

The AI provides:

* Missing Skills
* Weak Areas
* Resume Improvements
* Recommended Technologies
* Suggested Projects
* Suggested Certifications

### Step 6: Job Matching

Candidates can paste a job description and compare their resume against it.

The system generates:

* Match Percentage
* Matching Skills
* Missing Keywords
* ATS Compatibility
* Improvement Suggestions

---

# Database Design

The application stores data in MongoDB using the following collections:

### Users

Stores user information and roles.

### Resumes

Stores uploaded resumes and extracted information.

### Analyses

Stores AI-generated resume analysis reports.

### Jobs

Stores recruiter-created job postings.

### Applications

Stores candidate applications and match scores.

---

# Security Features

* JWT-based authentication
* Password hashing using bcrypt
* Protected routes
* Role-based authorization
* Secure file upload validation
* Rate limiting
* CORS protection
* Helmet security middleware

---

# Future Enhancements

* Resume Templates
* AI Cover Letter Generator
* Interview Question Generator
* Resume Version Tracking
* Recruiter Analytics Dashboard
* Email Notifications
* LinkedIn Profile Analysis
* Multi-language Resume Support

---

# Project Purpose

This project was built to demonstrate full-stack development skills using the MERN stack while integrating Artificial Intelligence into a real-world recruitment platform.

The project showcases:

* Frontend Development
* Backend Development
* Database Design
* Authentication
* File Upload Handling
* API Development
* AI Integration
* Cloud Deployment

and serves as a strong portfolio project for aspiring MERN Stack Developers.
