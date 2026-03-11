import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (userData) => api.post('/auth/login', userData),
  googleLogin: (idToken) => api.post('/auth/google', { idToken }),
};

export const categoryService = {
  getAll: () => api.get('/categories'),
  updateCover: (name, formData) => api.put(`/categories/${name}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export const projectService = {
  getAll: (category) => api.get('/projects', { params: { category } }),
  create: (formData) => api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/projects/${id}`),
  update: (id, data) => api.put(`/projects/${id}`, data),
  
  // Admin Project Methods
  updateDetails: (id, data) => api.put(`/projects/${id}/update`, data),
  deleteMedia: (id, mediaId) => api.delete(`/projects/${id}/media/${mediaId}`),
  uploadMedia: (id, formData) => api.post(`/projects/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateCover: (id, formData) => api.put(`/projects/${id}/cover`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  reorderMedia: (id, mediaOrder) => api.put(`/projects/${id}/reorder`, { mediaOrder }),
};

export const settingsService = {
  get: () => api.get('/settings'),
  update: (formData) => api.put('/settings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const ratingService = {
  add: (data) => api.post('/ratings', data),
  getAverage: (projectId) => api.get(`/ratings/${projectId}`),
  getAllReviews: () => api.get('/ratings/reviews/all')
};

export const contactService = {
  send: (data) => api.post('/contact', data),
};

export const bookingService = {
  create: (data) => api.post('/bookings', data),
};

export const serviceService = {
  getAll: () => api.get('/services'),
  create: (formData) => api.post('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/services/${id}`),
};

export default api;
