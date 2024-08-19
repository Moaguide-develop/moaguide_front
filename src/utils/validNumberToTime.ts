/**
 * 전화번호 인증 유효 숫자를 시간으로 변환하는 함수입니다 300 -> 5분
 */

export const validNumberToTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
