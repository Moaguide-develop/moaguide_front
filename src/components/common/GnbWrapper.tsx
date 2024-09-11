'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Gnb from '@/components/common/Gnb';

const GnbWrapper = () => {
  const pathname = usePathname();
  const [isGnbHidden, setIsGnbHidden] = useState(false);

  useEffect(() => {
    const checkIfGnbShouldBeHidden = () => {
      if (pathname === '/signup' || pathname === '/sign' || pathname === '/find' || pathname === '/login') {
        setIsGnbHidden(true);
      } else {
        setIsGnbHidden(false); 
      }
    };

    checkIfGnbShouldBeHidden();
  }, [pathname]);

  return !isGnbHidden ? <Gnb /> : null;
};

export default GnbWrapper;
