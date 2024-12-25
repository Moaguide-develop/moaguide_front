import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMemberStore } from '@/store/user.store';

interface MypageHeaderProps {
  bookmarks: number;
}

const MypageHeader = ({ bookmarks }: MypageHeaderProps) => {
  const { member } = useMemberStore();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[28px] pb-5 border-b border-gray100 mt-5 sm:mt-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="text-heading2">{member.memberNickName}</div>
          <div className="text-gray400 text-body1">{member.memberEmail}</div>
        </div>
        <div onClick={() => router.push('/mypage/edit')}>
          <img
            src="/images/mypage/right.svg"
            alt="arrow"
            className="w-[28px] h-[28px] cursor-pointer"
          />
        </div>
      </div>
      <Link href={'/mypage/bookmark'}>
        <div className="flex justify-between items-center px-[21px] py-[25px] bg-gradient2 rounded-[12px]">
          <div className="flex items-center gap-[14px]">
            <img src="/images/mypage/bookmark-white.svg" alt="" />
            <div className="text-white text-title1">관심종목</div>
          </div>
          <div>
            <div className="flex items-center gap-[14px]">
              <div className=" text-white">{bookmarks}개</div>
              <img
                src="/images/mypage/right_white.svg"
                alt="Bookmarks"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MypageHeader;
