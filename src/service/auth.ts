import { AuthHeaders, NicknameCheckResponse, SendCodeResponse, VerifyCodeResponse } from '@/types/auth';
import { setToken, removeToken, getToken } from '@/utils/localStorage';
import { useMemberStore } from '@/store/user.store';
import { axiosInstance, basicAxiosInstance, refreshAxiosInstance } from './axiosInstance';

// 토큰 사용하지 않는 API 함수들
export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/send/code', { phone });
  console.log(response.data);
  return response.data;
};


export const verifyCode = async (phone: string, code: string): Promise<VerifyCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/verify/code', { 
    phone,
    code
   });

  console.log('응답 데이터:', response.data);
  const token = response.headers['Verify'] || response.headers['verify'];
  console.log('응답 토큰', token);
  setToken(token);

  return response.data;
};

export const checkNicknameAvailability = async (nickname: string): Promise<NicknameCheckResponse | null> => {
  try {
    const response = await basicAxiosInstance.post('/signup/verify/nickname', { nickname });
    if (response.status === 200) {
      console.log('응답 성공:', response);  
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
          'Verify': authHeaders.Verify,
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
    console.log(token);
    const accessToken = token.replace('Bearer ', '');
    setToken(accessToken);

    const refreshToken = response.headers['Set-Cookie'] || response.headers['set-cookie'];

    const { setMember } = useMemberStore.getState();
    const userInfo = response.data.user;
    setMember({
      memberEmail: userInfo.email,
      memberNickName: userInfo.nickname,
      memberPhone: userInfo.phonenumber,
      loginType: userInfo.loginType, 
    });

    console.log(userInfo);

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

export const sendEmail = async (email: string) => {
  try {
    const response = await basicAxiosInstance.post(`/user/send/mail?email=${email}`);
    console.log('이메일 전송 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    throw error;
  }
};

export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const response = await basicAxiosInstance.post('/user/verify/mail', {
      email,
      code
    });
    console.log('인증 완료:', response.data);

    const token = response.headers['Verify'] || response.headers['verify'];
    console.log('응답 토큰', token);
    setToken(token);

    return response.data;
  } catch (error) {
    console.error('인증 실패:', error);
    throw error;
  }
};

export const getUserEmail = async (token: string) => {
  try {
    const response = await basicAxiosInstance.get('/user/email', {
      headers: {
        'verify': `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('이메일 정보 요청 실패:', error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await refreshAxiosInstance.post('/token/refresh', null);

    const newToken = response.headers['Authorization'] || response.headers['authorization'];
    
    if (newToken) {
      const accessToken = newToken.replace('Bearer ', '');
      setToken(accessToken);
      return accessToken;
    } else {
      throw new Error('새로운 액세스 토큰을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('리프레시 토큰 요청 오류:', error);
    removeToken(); 
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosInstance.delete('/user/Withdrawal');

    if (response.status === 200) {
      console.log(response.data.message);
      removeToken();

      const { clearMember } = useMemberStore.getState();
      clearMember();
      return response;  // 반환값 추가
    } else {
      console.error('회원탈퇴 실패', response.status);
      return response;  // 실패 시에도 response 반환
    }
  } catch (error) {
    console.error('회원탈퇴 오류:', error);
    throw error;  // 에러를 호출한 함수로 throw하여 catch하도록 함
  }
};