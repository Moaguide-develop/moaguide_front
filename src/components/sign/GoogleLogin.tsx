import Image from 'next/image';
import React from 'react';
import GoogleLoginButton from '../../../public/images/sign/google-login.svg'; 

const GoogleLogin = ({ setLoginType }: { setLoginType: (type: 'google') => void }) => {
    const handleGoogleLogin = () => {
      // loginType을 google로 설정
      setLoginType('google');  
      // 구글 로그인 페이지로 리다이렉트
      window.location.href = 'https://accounts.google.com/o/oauth2/auth';
    };
  
  return (
    <Image
      onClick={handleGoogleLogin}
      src={GoogleLoginButton}  
      alt="구글 로그인"
      width={320}             
      height={52}              
    />
  );
};

export default GoogleLogin;