import { IMovieSchedules } from '@/types/ContentProductType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const MovieContent = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop(); // 경로의 마지막 부분 추출
  console.log(lastSegment);

  const fetchData = async () => {
    const response = await axios.get<IMovieSchedules>(
      `https://api.moaguide.com/detail/contents/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['MovieStats'],
    queryFn: fetchData
  });

  console.log(data);
  return (
    <div>
      <Image
        src={
          'https://www.kobis.or.kr/common/mast/movie/2021/07/thumb_x192/thn_f152cfaea6bb460f80e227fb8e82bfb2.jpg'
        }
        width={192}
        height={192}
        alt="movie"
      />
    </div>
  );
};

export default MovieContent;
