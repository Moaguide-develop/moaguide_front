import Image from 'next/image';
import React from 'react';
import KakaoLoginButton from '../../../public/images/sign/kakao-login.svg'; 

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'https://api.moaguide.com/oauth2/authorization/naver';  
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