'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Gnb from '@/components/common/Gnb';

const GnbWrapper = () => {
  const pathname = usePathname();
  const [shouldRenderGnb, setShouldRenderGnb] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && (pathname === '/signup' || pathname === '/sign' || pathname === '/find' || pathname === '/login')) {
        setShouldRenderGnb(false);
      } else {
        setShouldRenderGnb(true);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return shouldRenderGnb ? <Gnb /> : null;
};

export default GnbWrapper;
