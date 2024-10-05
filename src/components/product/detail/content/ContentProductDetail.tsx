import MovieChart from './MovieChart';
import MovieContent from './MovieContent';
import MovieStats from './MovieStats';
import MovieTenChart from './MovieTenChart';
import Schedule from './Schedule';

const ContentProductDetail = ({ url, genre }: { url: string; genre: string }) => {
  console.log(url);

  return (
    <div>
      {genre === 'MOVIE' ? (
        <div className="max-w-[1000px] mx-auto mt-[32px]">
          <div className=" text-2xl font-bold mb-[20px]">개봉 스케쥴</div>
          <div>
            <Schedule />
          </div>
          <MovieContent />
          <div className=" text-2xl font-bold mb-[20px] mt-[30px]">통계정보</div>
          <MovieStats />
          <MovieChart />
          <MovieTenChart />
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto mt-[32px]">
          <div className="w-full h-[400px] flex  justify-center items-center bg-gray-200">
            <div className=" text-gray-400">서비스 준비중</div>
          </div>
          <div className=" text-2xl font-bold mb-[20px]">통계정보</div>
          <MovieStats />
          <MovieChart />
        </div>
      )}
    </div>
  );
};

export default ContentProductDetail;
