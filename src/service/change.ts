import { getToken } from '@/utils/localStorage';
import axios from 'axios';

axios.defaults.withCredentials = true;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const token = getToken();

export const updateNickname = async (nickname: string): Promise<boolean> => {
    try {
      const response = await axios.patch(`${backendUrl}/user/update/nickname`, 
        { nickname }, 
        {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          }
      );
      
      if (response.status === 200) {
        console.log('닉네임 수정 성공:', response.data);
        return true;
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
      const response = await axios.post(`${backendUrl}/user/check/password`, 
        { password },
        {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          }
      );
        console.log(response);
      return response.data; 
    } catch (error) {
      console.error('비밀번호 검증 실패:', error);
      throw error; 
    }
  };

  export const changePassword = async (password: string): Promise<string> => {
    try {
      const response = await axios.patch(`${backendUrl}/user/update/password`, 
        { password },
        {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          }
      );
        console.log(response);
      return response.data; 
    } catch (error) {
      console.error('비밀번호 검증 실패:', error);
      throw error; 
    }
  };