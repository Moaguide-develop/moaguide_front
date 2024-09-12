import { AuthHeaders, NicknameCheckResponse, SendCodeResponse, VerifyCodeResponse } from '@/type/auth';
import { setToken, removeToken } from '@/utils/localStorage';
import { useMemberStore } from '@/store/user.store';
import { axiosInstance, basicAxiosInstance } from './axiosInstance';

// 토큰 사용하지 않는 API 함수들
export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/send/code', { phone });
  console.log(response.data);
  return response.data;
};

export const verifyCode = async (phone: string, code: string): Promise<VerifyCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/verify/code', { phone, code });
  console.log('응답 데이터:', response.data);
  console.log('응답 헤더:', response.headers);

  const accessToken = response.headers['verify'];
  setToken(accessToken);

  return response.data;
};

export const checkNicknameAvailability = async (nickname: string): Promise<NicknameCheckResponse | null> => {
  try {
    const response = await basicAxiosInstance.post('/signup/verify/nickname', { nickname });
    if (response.status === 200) {
      console.log('응답 성공:', response);  // 전체 응답 객체를 출력
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
    const response = await basicAxiosInstance.post(
      '/signup',
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

// 토큰 사용하는 API 함수들
export const login = async (email: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await basicAxiosInstance.post('/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('로그인 성공:', response.data);

    const token = response.headers['authorization'] || response.headers['Authorization'];
    const accessToken = token.replace('Bearer ', '');
    setToken(accessToken);

    const { setMember } = useMemberStore.getState();
    const userInfo = response.data.user;
    setMember({
      memberEmail: userInfo.email,
      memberNickName: userInfo.nickname,
      memberPhone: userInfo.phonenumber,
      subscribe: '1개월 플랜', // 임시
    });

    return response.data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout', {});

    if (response.status === 200) {
      console.log(response.data.message);
      removeToken();

      const { clearMember } = useMemberStore.getState();
      clearMember();
    } else {
      console.error('로그아웃 실패', response.status);
    }
  } catch (error) {
    console.error('로그아웃 오류:', error);
  }
};
