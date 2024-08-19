/**
 * 영어로된 카테고리를 한글로 변환하여 return 하는 함수입니다
 */

export const formatCategory = (category: string) => {
  const arr = [
    {
      category: 'building',
      korean: '부동산'
    },
    {
      category: 'music',
      korean: '음악'
    },
    {
      category: 'cow',
      korean: '한우'
    },
    {
      category: 'art',
      korean: '미술품'
    },
    {
      category: 'content',
      korean: '콘텐츠'
    }
  ];

  const find = arr.find((item) => item.category === category);
  return find?.korean;
};
