import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IMusicYoutube } from '@/types/MusicProductType';

const MusicYoutube = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();

  const fetchData = async () => {
    const response = await axios.get<IMusicYoutube>(
      `https://api.moaguide.com/detail/music/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['YoutubeMusic', lastSegment],
    queryFn: fetchData
  });
  const videoId = data?.youtubeUrl.split('v=')[1]; // YouTube URL에서 비디오 ID 추출

  const opts = {
    height: '0',
    width: '100%',
    playerVars: {
      autoplay: 0 // 자동 재생 방지
    }
  };

  return (
    <div className=" flex desk:flex-col   md:flex-row ">
      <div className="max-w-[400px]  max-h-[200px]  mr-[30px]  ">
        <div className=" flex  md:w-[400px] md:h-[300px]   desk:w-[400px] desk:h-[200px] ">
          {/* 클릭 가능한 YouTube 썸네일 */}
          <a href={data?.youtubeUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="YouTube Thumbnail"
              className="cursor-pointer rounded-md w-full h-full object-fill"
            />
          </a>
        </div>
      </div>
      <div className="mt-[40px] ">
        <div className="text-2xl font-bold  mb-[10px]">대표곡 정보</div>

        <div className="text-xl ">{data?.youtubeTitle}</div>
      </div>
    </div>
  );
};

export default MusicYoutube;
