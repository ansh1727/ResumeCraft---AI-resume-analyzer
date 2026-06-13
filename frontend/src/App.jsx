import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/public/Home';
import Features from './pages/public/Features';
import Pricing from './pages/public/Pricing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import CandidateDashboard from './pages/candidate/CandidateDashboard';
import UploadResume from './pages/candidate/UploadResume';
import ResumeHistory from './pages/candidate/ResumeHistory';
import ResumeAnalysis from './pages/candidate/ResumeAnalysis';
import JobMatch from './pages/candidate/JobMatch';
import BrowseJobs from './pages/candidate/BrowseJobs';

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import Applicants from './pages/recruiter/Applicants';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import AdminAnalytics from './pages/admin/AdminAnalytics';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute roles={['candidate']} />}>
                  <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                  <Route path="/candidate/upload" element={<UploadResume />} />
                  <Route path="/candidate/history" element={<ResumeHistory />} />
                  <Route path="/candidate/analysis" element={<ResumeAnalysis />} />
                  <Route path="/candidate/job-match" element={<JobMatch />} />
                  <Route path="/candidate/jobs" element={<BrowseJobs />} />
                </Route>

                <Route element={<ProtectedRoute roles={['recruiter']} />}>
                  <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                  <Route path="/recruiter/post-job" element={<PostJob />} />
                  <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
                  <Route path="/recruiter/applicants" element={<Applicants />} />
                </Route>

                <Route element={<ProtectedRoute roles={['admin']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/jobs" element={<AdminJobs />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg, #fff)',
                color: 'var(--toast-color, #333)',
              },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
