import { AuthHeaders, NicknameCheckResponse, SendCodeResponse, VerifyCodeResponse } from '@/type/auth';
import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await axios.post(`${backendUrl}/signup/send/code`, { phone });
  console.log(response.data);
  return response.data;
};

export const verifyCode = async (phone: string, code: string): Promise<VerifyCodeResponse> => {
  const response = await axios.post(`${backendUrl}/signup/verify/code`, { phone, code });
  console.log('응답 데이터:', response.data);
  console.log('응답 헤더:', response.headers);

  let token = response.headers['authorization'] || response.headers['Authorization'];
  console.log('토큰', token);
  const accessToken = token.replace('Bearer ', '');
  console.log('어세스토큰', accessToken);
  localStorage.setItem('acess_token', accessToken);
  return response.data;
};

export const checkNicknameAvailability = async (nickname: string): Promise<NicknameCheckResponse | null> => {
  try {
    const response = await axios.post(`${backendUrl}/signup/verify/nickname`, { nickname });
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('서버 오류 응답 상태:', response.status);
      return null;
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
    return null;
  }
};

export const finalSignup = async (
  formData: any,
  authHeaders: AuthHeaders
) => {
  try {
    const response = await axios.post(
      `${backendUrl}/signup`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeaders.authorization,
        },
      }
    );
    console.log('서버 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('서버 요청 오류:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${backendUrl}/login`,
      { email, password },  
      {
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );
    const cookie = response.headers['set-cookie']?.[0] || '';
    const authorization = response.headers['authorization'] || '';

    console.log('로그인 성공:', response.data);
    return { cookie, authorization };
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};