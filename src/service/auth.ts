import { AuthHeaders, NicknameCheckResponse, SendCodeResponse, VerifyCodeResponse } from '@/type/auth';
import { setToken } from '@/utils/localStorage';
import axios from 'axios';
import { useMemberStore } from '@/store/user.store';

axios.defaults.withCredentials = true;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// 인증 코드 전송 함수
export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await axios.post(`${backendUrl}/signup/send/code`, { phone });
  console.log(response.data);
  return response.data;
};

// 코드 검증 함수
export const verifyCode = async (phone: string, code: string): Promise<VerifyCodeResponse> => {
  const response = await axios.post(`${backendUrl}/signup/verify/code`, { phone, code });
  console.log('응답 데이터:', response.data);
  console.log('응답 헤더:', response.headers);

  const token = response.headers['authorization'] || response.headers['Authorization'];
  console.log('토큰', token);
  const accessToken = token.replace('Bearer ', '');
  console.log('어세스토큰', accessToken);

  setToken(accessToken);

  return response.data;
};

// 닉네임 사용 가능 여부 확인 함수
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

// 최종 회원가입 함수
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

// 로그인 함수
export const login = async (email: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await axios.post(
      `${backendUrl}/login`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('로그인 성공:', response.data);

    const token = response.headers['authorization'] || response.headers['Authorization'];
    console.log('토큰:', token);
    const accessToken = token.replace('Bearer ', '');
    console.log('어세스토큰:', accessToken);

    setToken(accessToken);

    const { setMember } = useMemberStore.getState();
    const userInfo = response.data.user;
    setMember({
      memberEmail: userInfo.email,
      memberNickName: userInfo.nickname,
      memberPhone: userInfo.phonenumber,
      subscribe: '1개월 플랜' // 임시
    });

    return response.data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

