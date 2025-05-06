import Image from 'next/image';
import React from 'react';
import GoogleLoginButton from '/public/images/sign/google-login.svg';

const GoogleLogin = ({ setLoginType }: { setLoginType: (type: 'google') => void }) => {
  const handleGoogleLogin = () => {
    setLoginType('google');
    window.location.href = 'https://moaguide.n-e.kr/oauth2/authorization/google';
  };

  return (
    <div className="cursor-pointer" style={{ width: '320px', height: '52px' }}>
      <Image
        onClick={handleGoogleLogin}
        src={GoogleLoginButton}
        alt="구글 로그인"
        width={320}
        height={52}
        placeholder="blur"
        priority
        blurDataURL="sign/google-login.svg"
      />
    </div>
  );
};

export default GoogleLogin;
