'use client';
import { useAuthStore } from '@/store/userAuth.store';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/sign');
    }
  }, [isLoggedIn, router]);

  return (
    <Suspense>
      <div className="px-5 mt-5 w-full mx-auto sm:max-w-[640px] sm:mt-10 sm:px-0">
        {children}
      </div>
    </Suspense>
  );
}
