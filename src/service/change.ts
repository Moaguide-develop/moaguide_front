import { removeToken } from "@/utils/localStorage";
import { refreshAccessToken } from "./auth";
import { axiosInstance } from "./axiosInstance";
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';

export const updateNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.patch('/user/update/nickname', { nickname });

    if (response.status === 200) {
      // 기존 토큰 삭제
      removeToken();

      // 새로운 토큰 발급 요청에 지연을 추가
      try {
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 지연
        await refreshAccessToken(); // refreshAccessToken이 새로운 access_token과 refresh 토큰을 저장합니다.
        return true;
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
        alert('토큰 갱신에 실패했습니다. 다시 로그인해 주세요.');
        return false;
      }
    } else {
      console.error('닉네임 수정 실패:', response.status);
      return false;
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
    return false;
  }
};


export const checkPassword = async (password: string): Promise<string> => {
    try {
        const response = await axiosInstance.post('/user/check/password', { password });

        const token = response.headers['Verify'] || response.headers['verify'];
        setCookie('verify_token', token);

        return response.data;
    } catch (error) {
        console.error('비밀번호 검증 실패:', error);
        throw error;
    }
};


export const changePassword = async (password: string): Promise<string> => {
    try {
    
    const verifyToken = getCookie('verify_token');
    
    const response = await axiosInstance.patch(
      '/user/update/password', 
      { password },
      {
        headers: {
          Verify: `${verifyToken}`,  
        },
      }
    );
    
    return response.data;
    } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        throw error;
    }
};


export const changePasswordinFind = async (email:string, password: string): Promise<string> => {
    try {
        const verifyToken = getCookie('verify_token');

        const response = await axiosInstance.patch('/user/update/password', { email, password }, {
            headers: {
              Verify: `${verifyToken}`,  
            },
          });
        return response.data;
    } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        throw error;
    }
};
