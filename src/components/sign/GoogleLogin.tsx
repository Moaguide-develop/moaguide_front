import Image from 'next/image';
import React from 'react';
import GoogleLoginButton from '../../../public/images/sign/google-login.svg'; 

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://api.moaguide.com/oauth2/authorization/naver';  
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