import { getCookie, removeCookie, setCookie } from "./cookie";


export const setToken = (token: string) => {
  console.log('Saving token to cookie:', token); 
  setCookie('access_token', token, { path: '/', secure: true, sameSite: 'strict' });
};

export const getToken = (): string | undefined => {
  const token = getCookie('access_token');
  console.log('Retrieved token from cookie:', token); 
  return token;
};

export const removeToken = () => {
  removeCookie('access_token', { path: '/' });
  console.log('Access token removed from cookie');
};