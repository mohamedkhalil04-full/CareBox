import axios from 'axios';

const api = axios.create({
  baseURL: 'http://careboxapi.runasp.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن تلقائياً لأي ريكويست خارج
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// معالجة الـ Refresh Token تلقائياً لو السيرفر رجع 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // نداء الـ endpoint الخاصة بالريفريش توكن من الصورة اللي رفعتها
        const res = await axios.post('http://careboxapi.runasp.net/api/Auth/refresh-token');
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;