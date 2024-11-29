'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Gnb from '@/components/common/Gnb';
import { getCookie } from '@/utils/cookie';

const GnbWrapper = () => {
  const router = useRouter();
  const token = getCookie('access_token');
  const pathname = usePathname();
  const [isGnbHidden, setIsGnbHidden] = useState(false);

  useEffect(() => {
    const checkIfGnbShouldBeHidden = () => {
      const pathsToHideGnb = ['/signup', '/sign', '/find', '/detail', '/login', '/quiz'];
      const shouldHideGnb = pathsToHideGnb.some((path) => pathname.includes(path));
      setIsGnbHidden(shouldHideGnb);
    };

    checkIfGnbShouldBeHidden();
  }, [pathname]);

  useEffect(() => {
    console.log('client middleware', pathname);

    if (
      !token &&
      pathname !== '/sign' &&
      pathname !== '/signin' &&
      pathname !== '/signup' &&
      pathname !== '/find' &&
      pathname !== '/search' &&
      pathname !== '/'
    ) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/sign');
    }
  }, [router, pathname, token]);

  return !isGnbHidden ? <Gnb /> : null;
};

export default GnbWrapper;
