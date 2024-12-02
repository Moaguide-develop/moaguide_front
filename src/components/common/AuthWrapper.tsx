'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookie';

const GnbWrapper = () => {
  const pathname = usePathname();
  const router = useRouter();
  const token = getCookie('access_token');
  useEffect(() => {
    console.log('client middleware', pathname);
    if (
      !token &&
      pathname !== '/sign' &&
      pathname !== '/signin' &&
      pathname !== '/signup' &&
      pathname !== '/find' &&
      // pathname !== '/search' &&
      pathname !== '/'
    ) {
      alert('로그인이 필요한 서비스입니다.');
      router.replace('/sign');
    }
  }, [router, pathname, token]);

  return null;
};

export default GnbWrapper;
