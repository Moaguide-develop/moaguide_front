import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Line } from '../common/Line';
interface MypageHeaderProps {
  bookmarks: number;
}

export const ItemOfInterst = ({ bookmarks }: MypageHeaderProps) => {
  const router = useRouter();

  return (
    <div>
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
        onClick={() => router.push('/mypage/bookmark')}>
        <div className="flex items-center gap-[14px]">
          <div>
            <Image
              src="/images/mypage/bookmark.svg"
              alt={`interset img`}
              width={20}
              height={20}
            />
          </div>
          <div className="text-gray700 text-body1">관심종목</div>
        </div>
        <div className="flex">
          <div className=" text-gradient font-bold mr-3">{bookmarks}개</div>
          <Image
            src="/images/mypage/right_menu.svg"
            alt={`interest right icon`}
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>

      <Line mt={10} />
    </div>
  );
};
