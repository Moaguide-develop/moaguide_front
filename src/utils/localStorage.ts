import { getCookie, removeCookie, setCookie } from "./cookie";


export const setToken = (token: string) => {
  setCookie('access_token', token, { path: '/', secure: true, sameSite: 'strict' });
};

export const getToken = (): string | undefined => {
  const token = getCookie('access_token');
  return token;
};

export const removeToken = () => {
  removeCookie('access_token', { path: '/' });
};

export const setVerifyToken = (token: string) => {
  setCookie('verify_token', token, { path: '/', secure: true, sameSite: 'strict' });
};