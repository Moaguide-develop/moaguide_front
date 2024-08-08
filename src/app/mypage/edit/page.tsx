'use client';
import { useMemberStore } from '@/store/user.store';
import { checkEmail } from '@/utils/checkEmail';
import { useRouter } from 'next/navigation';
import React from 'react';

const Editpage = () => {
  const router = useRouter();
  const { member } = useMemberStore();

  return (
    <div className="max-w-[640px] w-full mx-auto">
      <div onClick={() => router.back()} className="py-[14px]">
        <img src="/images/mypage/left.svg" alt="" className="cursor-pointer" />
      </div>
      <div className="text-heading3 mt-3">프로필 수정</div>
      <section className="mt-10">
        {/* 닉네임 변경 */}
        <div className="flex justify-between items-center text-body4">
          <div>닉네임</div>
          <div>{member.memberNickName}</div>
        </div>
        <div className=" flex justify-between text-gray400 text-body7 mt-5 pb-5 border-b border-gray100">
          <div className="flex-1" />
          <div className="p-3 rounded-[12px] cursor-pointer border border-gray100 max-w-max hover:bg-bg">
            닉네임 변경
          </div>
        </div>
        {/* 이메일 */}
        <div className="mt-5 text-body4">
          <div className="flex justify-between items-center">
            <div>이메일</div>
            <div className="flex items-center gap-[6px]">
              <img src="/images/mypage/social.svg" alt="" />
              <div>{checkEmail(member?.memberEmail)} 가입</div>
            </div>
          </div>
          <div className=" flex justify-between mt-[13px] pb-5 border-b border-gray100">
            <div className="flex-1" />
            <div>{member.memberEmail}</div>
          </div>
        </div>
        {/* 비밀번호 변경 */}
        <div className="text-body4 mt-5 pb-5 border-b border-gray100 flex justify-between items-center">
          <div>비밀번호 변경하기</div>
          <div className="text-body7 text-gray400 cursor-pointer p-3 rounded-[12px] border border-gray100 hover:bg-bg">
            비밀번호 변경
          </div>
        </div>
        {/* 휴대폰 번호 변경 */}
        <div className="mt-5 pb-5 ">
          <div className="text-body4 flex justify-between items-center">
            <div>휴대폰 번호</div>
            <div>{member.memberPhone}</div>
          </div>
          <div className=" flex justify-between text-gray400 text-body7 mt-5 pb-5 border-b border-gray100">
            <div className="flex-1" />
            <div className="p-3 rounded-[12px] cursor-pointer border border-gray100 max-w-max hover:bg-bg">
              휴대폰 번호 변경
            </div>
          </div>
        </div>
      </section>
      {/* 회원탈퇴 */}
      <div className=" text-body7 text-error flex justify-end hover:underline">
        <span className="cursor-pointer">회원탈퇴</span>
      </div>
      {/* 수정 완료 */}
      <div className=" mt-12 flex justify-end">
        <div className="flex-1"></div>
        <div className="px-5 py-[14px] rounded-[12px] bg-gray100 w-[280px] flex justify-center text-title2 text-gray400">
          수정 완료
        </div>
      </div>
      <div className="h-[140px]" />
    </div>
  );
};

export default Editpage;
