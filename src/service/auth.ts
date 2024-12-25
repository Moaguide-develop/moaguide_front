import {
  AuthHeaders,
  NicknameCheckResponse,
  SendCodeResponse,
  VerifyCodeResponse
} from '@/types/auth';
import { setToken, removeToken, getToken, setVerifyToken } from '@/utils/localStorage';
import { useMemberStore } from '@/store/user.store';
import { axiosInstance, basicAxiosInstance, refreshAxiosInstance } from './axiosInstance';

// 토큰 사용하지 않는 API 함수들
export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/send/code', { phone });
  return response.data;
};

export const verifyCode = async (
  phone: string,
  code: string
): Promise<VerifyCodeResponse> => {
  const response = await basicAxiosInstance.post('/signup/verify/code', {
    phone,
    code
  });

  const token = response.headers['Verify'] || response.headers['verify'];
  setToken(token);

  return response.data;
};

export const checkNicknameAvailability = async (
  nickname: string
): Promise<NicknameCheckResponse | null> => {
  try {
    const response = await basicAxiosInstance.post('/signup/verify/nickname', {
      nickname
    });
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

export const finalSignup = async (formData: any, authHeaders: AuthHeaders) => {
  try {
    const response = await basicAxiosInstance.post('/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
        Verify: authHeaders.Verify
      }
    });
    return response.data;
  } catch (error) {
    console.error('서버 요청 오류:', error);
    throw error;
  }
};

export const login = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const url = `/login?rememberMe=${rememberMe}`;

    const response = await basicAxiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const token = response.headers['authorization'] || response.headers['Authorization'];
    if (!token) {
      throw new Error(
        '토큰을 찾을 수 없습니다. 헤더에서 Authorization이 존재하지 않습니다.'
      );
    }

    const accessToken = token.replace('Bearer ', '');
    setToken(accessToken);

    const { setMember } = useMemberStore.getState();
    const userInfo = response.data.user;
    if (!userInfo) {
      throw new Error('사용자 정보를 응답에서 찾을 수 없습니다.');
    }

    setMember({
      memberEmail: userInfo.email,
      memberNickName: userInfo.nickname,
      memberPhone: userInfo.phonenumber,
      loginType: userInfo.loginType,
      marketing: userInfo.marketing || 0
    });

    return response.data;
  } catch (error) {
    console.error('로그인 오류 발생:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout', {});

    if (response.status === 200) {
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

    const token = response.headers['Verify'] || response.headers['verify'];
    setVerifyToken(token);

    return response.data;
  } catch (error) {
    console.error('인증 실패:', error);
    throw error;
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const response = await basicAxiosInstance.post('/signup/verify/email', { email });

    if (response.status === 200) {
      return { success: true, message: '중복된 이메일이 없습니다.' };
    } else {
      console.error('서버 오류 응답 상태:', response.status);
      return { success: false, message: '서버 오류가 발생했습니다.' };
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: '중복된 이메일이 있습니다.' };
    } else {
      console.error('API 호출 오류:', error);
      return { success: false, message: 'API 호출 중 오류가 발생했습니다.' };
    }
  }
};

export const getUserEmail = async (token: string) => {
  try {
    const response = await basicAxiosInstance.get('/user/email', {
      headers: {
        verify: `${token}`
      }
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

    const newToken =
      response.headers['Authorization'] || response.headers['authorization'];

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
      removeToken();

      const { clearMember } = useMemberStore.getState();
      clearMember();
      return response;
    } else {
      console.error('회원탈퇴 실패', response.status);
      return response;
    }
  } catch (error) {
    console.error('회원탈퇴 오류:', error);
    throw error;
  }
};
