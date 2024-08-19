/*
유저의 이메일을 받아와서 도메인에 맞는 주소를 출력하는 함수입니다
e.g. input) test@gmail.com -> output) 구글
*/

export const checkEmail = (email: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return null;
  }

  const domainPattern = /@([^@.]+)\./;
  const match = email.match(domainPattern);

  if (match && match[1] === 'naver') {
    return '네이버';
  } else if (match && match[1] === 'kakao') {
    return '카카오';
  } else if (match && match[1] === 'gmail') {
    return '구글';
  } else if (match && match[1] === 'nate') {
    return '네이트';
  } else if (match && match[1] === 'daum') {
    return '다음';
  } else if (match && match[1] === 'hanmail') {
    return '다음';
  } else if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
