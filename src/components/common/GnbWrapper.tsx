'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Gnb from '@/components/common/Gnb';

const GnbWrapper = () => {
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
  return !isGnbHidden ? <Gnb /> : null;
};

export default GnbWrapper;
