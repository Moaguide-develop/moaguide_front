import { IContentMovieStats, IMovieSchedules } from '@/types/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MovieContent = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출

  const fetchData = async () => {
    const response = await axios.get<IContentMovieStats>(
      `https://api.moaguide.com/detail/content/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['MovieContent', lastSegment],
    queryFn: fetchData
  });

  const movieData =
    data?.schedules.filter((item) =>
      item.imgLink.startsWith('https://www.kobis.or.kr/')
    ) || [];

  return (
    <div className="flex mt-[50px]">
      <div className="w-full grid lg:grid-cols-2 gap-4 md:grid-cols-2 desk:grid-cols-1">
        {movieData.map((item) => (
          <div key={item.id} className="flex">
            <div className="w-[107px] h-[174px] relative ">
              <Image
                src={item.imgLink}
                alt="movie"
                layout="fill" // 이미지가 부모의 크기에 맞게 채워지도록 설정
                objectFit="cover"
              />
            </div>

            <div className="flex flex-col ml-[10px]">
              <div className="text-lg font-bold">{item.title}</div>
              <div className="text-sm my-1">
                {item.genre} | {item.country} | 감독 {item.director}
              </div>
              <div className="flex mt-[5px]">
                <div className="text-sm inline p-1 rounded-lg bg-red-500 text-white ">
                  개봉예정일
                </div>
                <div className="text-sm p-1 ml-[5px]">{item.releaseDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieContent;
