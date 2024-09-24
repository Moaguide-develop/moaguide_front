import axios from 'axios';
import { getToken, setToken, removeToken } from '@/utils/localStorage';
import { refreshAccessToken } from './auth'; // 새로 추가된 refreshAccessToken 함수

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// 토큰을 사용하는 Axios 인스턴스
export const axiosInstance = axios.create({
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

// 응답 인터셉터에서 401(토큰 만료) 오류 처리
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
        setToken(newToken); // 새 토큰 저장

        // 새 토큰으로 헤더를 갱신한 후, 실패한 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 오류:', refreshError);
        removeToken(); // 토큰이 유효하지 않다면 삭제
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 토큰을 사용하지 않는 Axios 인스턴스
export const basicAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});
