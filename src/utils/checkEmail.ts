
export const getSocialInfo = (loginType: string, email: string) => {
  switch (loginType) {
    case 'kakao':
      return {
        platform: '카카오',
        imgSrc: '/images/mypage/kakaoSocial.svg',
      };
    case 'google':
      return {
        platform: '구글',
        imgSrc: '/images/mypage/googleSocial.svg',
      };
    case 'naver':
      return {
        platform: '네이버',
        imgSrc: '/images/mypage/naverSocial.svg',
      };
    case 'local':
      return {
        platform: '일반',
        imgSrc: null,
      };
    default:
      return {
        platform: '알 수 없음',
        imgSrc: null,
      };
  }
};