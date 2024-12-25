import { Suspense } from 'react';

export default function CardmanageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      {/* <div className="px-5 mt-5 w-full mx-auto sm:max-w-[640px] sm:mt-10 sm:px-0">{children}</div> */}
      {children}
    </Suspense>
  );
}
