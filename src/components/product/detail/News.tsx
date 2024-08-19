import Image from 'next/image';
import { formatDate } from '@/utils/FormatDate';
const News = () => {
  const MOCK = {
    news: [
      {
        id: 59502,
        title: '[Who Is ?] 박성철 신원 회장',
        category: 'building',
        link: 'https://www.businesspost.co.kr/BP?command=article_view&num=358394',
        date: '2024-07-10T08:34:00.000+00:00'
      },
      {
        id: 59503,
        title: '뭐든 쪼개는 ‘조각 투자’… 송아지부터 엔진까지 산다',
        category: 'building',
        link: 'https://n.news.naver.com/mnews/article/082/0001277150?sid=101',
        date: '2024-06-30T18:08:00.000+00:00'
      },
      {
        id: 59504,
        title: '틱톡 코리아 The8 , 더청담문화예술아카데미와 MOU 체결',
        category: 'building',
        link: 'http://www.globalepic.co.kr/view.php?ud=20240617103758156348439a4874_29',
        date: '2024-06-17T10:42:00.000+00:00'
      },
      {
        id: 588,
        title: '틱톡 코리아 The8 , 더청담문화예술아카데미와 MOU 체결',
        category: 'building',
        link: 'http://www.globalepic.co.kr/view.php?ud=20240617103758156348439a4874_29',
        date: '2024-06-17T10:42:00.000+00:00'
      }
    ],
    total: 6,
    page: 1,
    size: 10
  };
  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      {MOCK.news.map((item) => {
        return (
          <div
            key={item.id}
            className=" flex justify-between border-b-[1px] border-gray-200 py-[20px] px-[20px] rounded-lg">
            <div className="flex">
              <Image src={'/images/detail/News.png'} width={132} height={93} alt="News" />
              <div className="ml-[16px] mt-[15px]">
                <div className="text-base font-bold">{item.title} </div>
                <div className="text-gray-400 mt-[16px]">한국 경제</div>
              </div>
            </div>

            <div className="text-gray-400 flex items-end mb-[12px]">
              {formatDate(item.date)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
