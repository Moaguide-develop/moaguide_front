import { SendCodeResponse, VerifyCodeResponse } from '@/type/auth';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendVerificationCode = async (phone: string): Promise<SendCodeResponse> => {
  const response = await axios.post(`${backendUrl}signup/send/code`, { phone });
  console.log(response.data);
  return response.data;
};

export const verifyCode = async (phone: string, code: string): Promise<VerifyCodeResponse> => {
  const response = await axios.post(`${backendUrl}signup/verify/code`, { phone, code });
  console.log(response.data);
  return response.data;
};
