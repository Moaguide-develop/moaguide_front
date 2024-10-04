import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const NaverCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleNaverCallback = async () => {
      try {
        // 네이버 인증 후 백엔드에서 JSON 응답을 받음
        const response = await fetch(`https://api.moaguide.com/naver/callback`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (data.jwtToken) {
          // JWT 토큰을 쿠키에 저장 (또는 로컬 스토리지)
          Cookies.set('jwt', data.jwtToken, { expires: 1 });

          // 이메일, 이름 등 사용자 정보를 저장한 후 회원가입 페이지로 리다이렉트
          router.push(`/signup?social=true&email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}`);
        } else {
          console.error('JWT 토큰이 없습니다.');
        }
      } catch (error) {
        console.error('네이버 로그인 처리 중 오류 발생:', error);
      }
    };

    handleNaverCallback();
  }, [router]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;