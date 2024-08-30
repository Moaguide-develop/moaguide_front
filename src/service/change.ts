import { axiosInstance } from "./axiosInstance";

export const updateNickname = async (nickname: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.patch('/user/update/nickname', { nickname });
      
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
        const response = await axiosInstance.post('/user/check/password', { password });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('비밀번호 검증 실패:', error);
        throw error;
    }
};


export const changePassword = async (password: string): Promise<string> => {
    try {
        const response = await axiosInstance.patch('/user/update/password', { password });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        throw error;
    }
};
