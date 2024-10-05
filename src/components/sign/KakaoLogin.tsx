import Image from 'next/image';
import React from 'react';
import KakaoLoginButton from '../../../public/images/sign/kakao-login.svg'; 

const KakaoLogin = ({ setLoginType }: { setLoginType: (type: 'kakao') => void }) => {
    const handleKakaoLogin = () => {
      // loginType을 kakao로 설정
      setLoginType('kakao');  
      // 카카오 로그인 페이지로 리다이렉트
      window.location.href = 'https://kauth.kakao.com/oauth/authorize';
    };
  
  return (
    <Image
      onClick={handleKakaoLogin}
      src={KakaoLoginButton}  
      alt="카카오 로그인"
      width={320}             
      height={52}              
    />
  );
};

export default KakaoLogin;