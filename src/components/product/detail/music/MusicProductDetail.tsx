import YoutubeSearchChart from './chart/YoutubeSearchChart';
import YoutubeViewChart from './chart/YoutubeViewChart';
import MusicSchedule from './MusicSchedule';
import MusicYoutube from './MusicYoutube';

const MusicProductDetail = () => {
  return (
    <div className="max-w-[1000px]   mx-auto mt-[32px]">
      <div className="mb-[100px]">
        <MusicYoutube />
      </div>
      <div className="h-[50px]"></div>
      <div className="mt-[10px] text-2xl font-bold mb-[10px]">유튜브 조회수</div>
      <YoutubeViewChart />

      <div className="mt-[10px] text-2xl font-bold mb-[10px]">검색량</div>
      <YoutubeSearchChart />

      <div>일간/월간 스트리밍 수</div>

      <div className="mt-[10px] text-2xl font-bold mb-[10px]">공연일정</div>

      <MusicSchedule />
    </div>
  );
};

export default MusicProductDetail;