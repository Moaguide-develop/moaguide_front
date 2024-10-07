import React from 'react';
import Image from 'next/image';
import NaverLoginButton from '../../../public/images/sign/naver-login.svg'; 

const NaverLogin = ({ setLoginType }: { setLoginType: (type: 'naver') => void }) => {
  const handleNaverLogin = () => {
    // loginType을 naver로 설정
    setLoginType('naver');  
    // 네이버 로그인 페이지로 리다이렉트
    window.location.href = 'https://api.moaguide.com/oauth2/authorization/naver';
  };

  return (
    <Image
      onClick={handleNaverLogin}
      src={NaverLoginButton}  
      alt="네이버 로그인"
      width={320}             
      height={52}        
      className='cursor-pointer'      
    />
  );
};

export default NaverLogin;