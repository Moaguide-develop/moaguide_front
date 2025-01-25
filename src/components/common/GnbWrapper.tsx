'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Gnb from '@/components/common/Gnb';

const GnbWrapper = () => {
  const pathname = usePathname();
  const [isGnbHidden, setIsGnbHidden] = useState(false);
  useEffect(() => {
    const checkIfGnbShouldBeHidden = () => {
      const pathsToHideGnb = ['/signup', '/sign', '/find', '/login', '/quiz'];
      
      // `/learning/detail` 경로는 Gnb를 숨기지 않음
      const shouldHideGnb = pathsToHideGnb.some((path) => pathname.includes(path)) &&
                            !pathname.startsWith('/learning/detail');
    
      setIsGnbHidden(shouldHideGnb);
    };

    checkIfGnbShouldBeHidden();
  }, [pathname]);
  return !isGnbHidden ? <Gnb /> : null;
};

export default GnbWrapper;
