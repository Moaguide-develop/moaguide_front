import { cookies } from 'next/headers';

export const getCookie = (key: string): string | undefined => {
  return cookies().get(key)?.value;
};
