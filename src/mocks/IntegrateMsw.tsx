'use client';
import React, { useEffect } from 'react';

async function startClientMSW() {
  if (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_API_MOCKING === 'enable'
  ) {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
}

export default function IntegrateMSW({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startClientMSW();
  }, []);

  return <div>{children}</div>;
}
