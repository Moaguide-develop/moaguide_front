import axios from 'axios';
import { getToken, setToken, removeToken } from '@/utils/localStorage';

const backendUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DATA
    : process.env.NEXT_PUBLIC_BACKEND_URL;

// Axios 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true
});

export const basicAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true
});

export const refreshAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true
});

// 리프레시 토큰 함수
export const refreshAccessToken = async () => {
  try {
    const response = await refreshAxiosInstance.post('/token/refresh');
    const newToken =
      response.headers['authorization'] || response.headers['Authorization'];
    if (!newToken) throw new Error('새로운 액세스 토큰을 받을 수 없습니다.');
    const accessToken = newToken.replace('Bearer ', '');
    setToken(accessToken); // 새 토큰 저장
    return accessToken;
  } catch (error) {
    console.error('리프레시 토큰 갱신 실패:', error);
    removeToken(); // 만료된 토큰 제거
    throw error;
  }
};

// Axios 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // 실패한 요청 재시도
      } catch (refreshError) {
        removeToken();
        window.location.href = '/sign'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
