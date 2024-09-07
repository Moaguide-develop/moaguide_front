import { Suspense } from 'react';

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="max-w-[640px] w-full mx-auto">{children}</div>
    </Suspense>
  );
}
