import Image from 'next/image';
import React from 'react';
import GoogleLoginButton from '../../../public/images/sign/google-login.svg'; 

const GoogleLogin = ({ setLoginType }: { setLoginType: (type: 'google') => void }) => {

    const handleGoogleLogin = () => {
      setLoginType('google');  
      window.location.href = 'https://api.moaguide.com/oauth2/authorization/google';
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