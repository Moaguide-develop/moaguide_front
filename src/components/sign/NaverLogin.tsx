import React from 'react';

const NaverLogin = () => {
  const handleNaverLogin = () => {
    // 네이버 로그인 페이지로 리다이렉트
    window.location.href = 'https://api.moaguide.com/oauth2/authorization/naver';  // 네이버 로그인 URL
  };

  return (
    <button onClick={handleNaverLogin} className="bg-green-500 text-white p-4 rounded-lg mt-4">
      네이버로 로그인
    </button>
  );
};

export default NaverLogin;