import Image from 'next/image';
import React from 'react';
import GoogleLoginButton from '../../../public/images/sign/google-login.svg'; 

const KakaoLogin = ({ setLoginType }: { setLoginType: (type: 'google') => void }) => {

    const handleKakaoLogin = () => {
      setLoginType('google');  
      window.location.href = 'https://api.moaguide.com/oauth2/authorization/google';
    };
  
  return (
    <Image
      onClick={handleKakaoLogin}
      src={GoogleLoginButton}  
      alt="구글 로그인"
      width={320}             
      height={52}   
      className='cursor-pointer'           
    />
  );
};

export default KakaoLogin;