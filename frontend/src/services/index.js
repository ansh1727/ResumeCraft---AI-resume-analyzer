import api from './api';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const resumeAPI = {
  upload: (formData) =>
    api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAll: () => api.get('/resumes'),
  getById: (id) => api.get(`/resumes/${id}`),
  delete: (id) => api.delete(`/resumes/${id}`),
  analyze: (id) => api.post(`/resumes/${id}/analyze`),
  getAnalyses: () => api.get('/resumes/analyses'),
  getAnalysis: (id) => api.get(`/resumes/analyses/${id}`),
};

export const matchAPI = {
  matchJob: (data, file) => {
    const formData = new FormData();
    formData.append('jobDescription', data.jobDescription);
    if (data.resumeId) formData.append('resumeId', data.resumeId);
    if (file) formData.append('resume', file);
    return api.post('/match', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const jobAPI = {
  getAll: () => api.get('/jobs'),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: () => api.get('/jobs/recruiter/my-jobs'),
  getApplicants: (id) => api.get(`/jobs/${id}/applicants`),
  apply: (data) => api.post('/jobs/apply', data),
  getMyApplications: () => api.get('/jobs/candidate/my-applications'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getJobs: () => api.get('/admin/jobs'),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`),
};
