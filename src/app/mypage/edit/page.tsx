'use client';
import { useModalStore } from '@/store/modal.store';
import { useMemberStore } from '@/store/user.store';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { checkNicknameAvailability } from '@/service/auth';
import { updateNickname } from '@/service/change';
import { getSocialInfo } from '@/utils/checkEmail';
import { useAuthStore } from '@/store/userAuth.store';

const Editpage = () => {
  const router = useRouter();
  const { member } = useMemberStore();
  const [isClickedName, setIsClickedName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameComplete, setIsNameComplete] = useState('');
  const { setModalType, setOpen, open } = useModalStore();

  const { isLoggedIn } = useAuthStore();

  const socialInfo = getSocialInfo(member.loginType, member.memberEmail); 

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    setNameValue(regex);
  };

  const checkNameDuplicate = async () => {
    try {
      const response = await checkNicknameAvailability(nameValue);
      console.log(response)
      if (response) {
        setIsNameComplete('yes');
      } else {
        setIsNameComplete('no');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setIsNameComplete('no');
    }
  };

  const handleComplete = async () => {
    if (isNameComplete === 'yes') {
      const success = await updateNickname(nameValue);
      
      if (success) {
        const { member, setMember } = useMemberStore.getState();
        
        const updatedMember = {
          ...member,
          memberNickName: nameValue,
        };
  
        setMember(updatedMember);
        
        alert('닉네임이 성공적으로 수정되었습니다.');
        router.push('/mypage'); 
      } else {
        alert('닉네임 수정에 실패하였습니다. 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  
  useEffect(() => {
    setIsNameValid(nameValue.length >= 3);
    setIsNameComplete('');
  }, [nameValue]);

  useEffect(() => {
    if (open) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  }, [open]);

  return (
    <div className="min-h-[calc(100dvh-160px)] mb-[20px] sm:mb-0 px-5 mt-5 w-full mx-auto sm:max-w-[640px] sm:mt-10 sm:px-0">
      <div onClick={() => router.back()} className="py-[14px]">
        <img src="/images/mypage/left.svg" alt="" className="cursor-pointer" />
      </div>
      <div className="text-heading3 mt-3">프로필 수정</div>
      <section className="mt-10">
        {/* 닉네임 변경 */}
        <div className="flex justify-between items-center text-body4">
          <div>닉네임</div>
          <div className={`${isClickedName && 'hidden'}`}>{member.memberNickName}</div>
        </div>
        {isClickedName ? (
          <div className="pb-5 border-b">
            <div className="flex items-center border-gray100">
              <input
                type="text"
                placeholder="닉네임 입력"
                value={nameValue}
                onChange={handleNameChange}
                className={`flex-1 bg-bg rounded-[12px] px-4 py-[14px] mt-2 text-body2 outline-none flex-grow
              ${isNameComplete === 'no' && 'outline-error'}
              ${isNameComplete === 'yes' && 'outline-success'}
              `}
              style={{ minWidth: '0' }} 
              />
              {isNameValid ? (
                <div
                  onClick={checkNameDuplicate}
                  className="ml-[6px] cursor-pointer flex mt-[8px] px-4 py-[14px] bg-black rounded-[12px] text-body5 text-white flex-shrink-0">
                  중복확인
                </div>
              ) : (
                <div className="ml-[6px] flex mt-[8px] px-4 py-[14px] bg-gray100 rounded-[12px] text-body5 text-gray400 flex-shrink-0">
                  중복확인
                </div>
              )}
            </div>
            {isNameComplete === 'no' && (
              <div className="mt-[10px] text-caption3 text-error">
                이미 사용중인 닉네임입니다.
              </div>
            )}
            {isNameComplete === 'yes' && (
              <div className="mt-[10px] text-caption3 text-success">
                사용가능한 닉네임입니다.
              </div>
            )}
          </div>
        ) : (
          <div className=" flex justify-between text-gray400 text-body7 mt-5 pb-5 border-b border-gray100">
            <div className="flex-1" />
            <div
              onClick={() => setIsClickedName(true)}
              className={`p-3 rounded-[12px] cursor-pointer border border-gray100 max-w-max hover:bg-bg`}>
              닉네임 변경
            </div>
          </div>
        )}

        {/* 이메일 */}
        <div className="mt-5 text-body4">
          <div className="flex justify-between items-center">
            <div>이메일</div>
            <div className="flex items-center gap-[8px]">
              {socialInfo.imgSrc && <img src={socialInfo.imgSrc} alt="socialLogo" width={18} height={18}/>}
              <div>{socialInfo.platform} 가입</div>
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
          <div
            onClick={() => router.push('/mypage/edit/changepassword')}
            className="text-body7 text-gray400 cursor-pointer p-3 rounded-[12px] border border-gray100 hover:bg-bg">
            비밀번호 변경
          </div>
        </div>
        {/* 휴대폰 번호 변경 */}
        <div className="mt-5 pb-5 ">
          <div className="text-body4 flex justify-between items-center">
            <div>휴대폰 번호</div>
            <div>{member?.memberPhone || '없음'}</div>
          </div>
          <div className=" flex justify-between text-gray400 text-body7 mt-5 pb-5 border-b border-gray100">
            <div className="flex-1" />
            <div
              onClick={() => router.push('/mypage/edit/changephone')}
              className="p-3 rounded-[12px] cursor-pointer border border-gray100 max-w-max hover:bg-bg">
              휴대폰 번호 변경
            </div>
          </div>
        </div>
      </section>
      {/* 회원탈퇴 */}
      <div
        onClick={() => {
          setOpen(true);
          setModalType('secession');
        }}
        className=" text-body7 text-error flex justify-end hover:underline">
        <span className="cursor-pointer">회원탈퇴</span>
      </div>
      {/* 수정 완료 */}
      <div className=" mt-12 flex justify-end">
        <div className="flex-1"></div>
        {isNameComplete === 'yes' ? (
          <div
            onClick={handleComplete}
            className="bg-gradient2 cursor-pointer px-5 py-[14px] rounded-[12px] bg-gray100 w-[280px] flex justify-center text-title2 text-white">
            수정 완료
          </div>
        ) : (
          <div className="px-5 py-[14px] rounded-[12px] bg-gray100 w-[280px] flex justify-center text-title2 text-gray400">
            수정 완료
          </div>
        )}
      </div>
    </div>
  );
};

export default Editpage;
