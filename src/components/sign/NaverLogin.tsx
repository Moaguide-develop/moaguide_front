import Image from 'next/image';
import React from 'react';
import NaverLoginButton from '../../../public/images/sign/naver-login.svg'; 

const NaverLogin = () => {
  const handleNaverLogin = () => {
    window.location.href = 'https://api.moaguide.com/oauth2/authorization/naver';  
  };

  return (
    <Image
      onClick={handleNaverLogin}
      src={NaverLoginButton}  
      alt="네이버 로그인"
      width={320}             
      height={52}              
    />
  );
};

export default NaverLogin;