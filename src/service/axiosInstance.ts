// src/api/axiosInstance.ts

import axios from 'axios';
import { getToken } from '@/utils/localStorage';

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

// 토큰을 사용하지 않는 Axios 인스턴스
export const basicAxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});
