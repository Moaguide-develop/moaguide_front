export const setToken = (token: string) => {
  console.log('Saving token:', token); 
  localStorage.setItem('access_token', token);
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token:', token); 
  return token;
};


export const removeToken = () => {
    localStorage.removeItem('access_token');
  };