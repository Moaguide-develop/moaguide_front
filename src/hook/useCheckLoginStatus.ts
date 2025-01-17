import { useEffect, useState } from 'react';

import { getCookie, removeCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
const useCheckLoginStatus = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getCookie('access_token');
      if (!accessToken || accessToken === 'undefined') {
        router.push('/sign');
      } else {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [router]);

  return { loading };
};

export default useCheckLoginStatus;
