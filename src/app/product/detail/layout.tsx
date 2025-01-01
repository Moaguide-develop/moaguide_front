'use client';
import Gnb from '@/components/common/Gnb';
import ArtDetailGnb from '../(product)/gnb/ArtDetailGnb';
import BuildingDetailGnb from '../(product)/gnb/BuildingDetailGnb';
import ContentDetailGnb from '../(product)/gnb/ContentDetailGnb';
import CowDetailGnb from '../(product)/gnb/CowDetailGnb';
import MusicDetailGnb from '../(product)/gnb/MusicDetailGnb';
import { usePathname } from 'next/navigation';
export default function ProductDetailLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const secondLastSegment =
    pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : '';

  return (
    <div>
      <div className="md:block desk:hidden">
        <Gnb />
      </div>
      <div className="desk:block md:hidden">
        {secondLastSegment === 'building' ? (
          <BuildingDetailGnb />
        ) : secondLastSegment === 'cow' ? (
          <CowDetailGnb />
        ) : secondLastSegment === 'music' ? (
          <MusicDetailGnb />
        ) : secondLastSegment === 'art' ? (
          <ArtDetailGnb />
        ) : (
          <ContentDetailGnb />
        )}
      </div>
      {children}
    </div>
  );
}
