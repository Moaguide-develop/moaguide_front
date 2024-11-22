import { usePathname } from 'next/navigation';

export const formatUrl = (url: string) => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();

  return lastSegment;
};
