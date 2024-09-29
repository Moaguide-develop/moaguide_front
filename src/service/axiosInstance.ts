import axios from 'axios';
import { getToken, setToken, removeToken } from '@/utils/localStorage';
import { refreshAccessToken } from './auth';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// 토큰을 사용하는 Axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// 토큰을 사용하지 않는 Axios 인스턴스
export const basicAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// 리프레시 토큰 요청을 위한 Axios 인스턴스
export const refreshAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});


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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰이 만료되어 401 에러가 발생했을 경우
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 중복 요청 방지 플래그 설정

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급
        const newToken = await refreshAccessToken();
        if (newToken) {
          // 새 토큰으로 헤더를 갱신한 후, 실패한 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 오류:', refreshError);
        
        // 리프레시 토큰 갱신 실패 시 로그아웃 처리 또는 에러 핸들링
        removeToken(); // 만료된 토큰 제거
        window.location.href = '/sign'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError); // 무한 루프 방지
      }
    }

    return Promise.reject(error);
  }
);