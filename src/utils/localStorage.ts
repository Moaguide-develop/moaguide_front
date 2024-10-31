import { getCookie, removeCookie, setCookie } from "./cookie";

const TOKEN_EXPIRATION_TIME = 60 * 1000;

export const setToken = (token: string) => {
  const expires = new Date(Date.now() + TOKEN_EXPIRATION_TIME); 
  setCookie('access_token', token, { path: '/', secure: true, sameSite: 'strict', expires });
};

export const getToken = (): string | undefined => {
  const token = getCookie('access_token');
  return token;
};

export const removeToken = () => {
  removeCookie('access_token', { path: '/' });
  removeCookie('refresh', { path: '/' });
  removeCookie('rememberMe', { path: '/' });
  removeCookie('verify_token', { path: '/' });
};

export const setVerifyToken = (token: string) => {
  const expires = new Date(Date.now() + TOKEN_EXPIRATION_TIME);
  setCookie('verify_token', token, { path: '/', secure: true, sameSite: 'strict', expires });
};