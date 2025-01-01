import { basicAxiosInstance } from '@/service/axiosInstance';
import { IMusicSchedule } from '@/types/Product/MusicProductType';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

const MusicSchedule = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();

  const fetchData = async () => {
    const response = await basicAxiosInstance.get<IMusicSchedule>(
      `/detail/music/consert/${lastSegment}`
    );
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['MusicSchedule', lastSegment],
    queryFn: fetchData
  });

  return (
    <div>
      <div className="w-full mb-[30px]">
        <div className="grid  desk2:grid-cols-2  md:grid-cols-4  gap-x-2 gap-y-2 ">
          {data &&
            data?.map((item, index) => (
              <div
                key={index}
                className="flex  border-gray-200 border-2  p-2  rounded-2xl"
                onClick={() => {
                  router.push(`${item.link}`);
                }}>
                <div className="flex flex-col flex-1">
                  <div className="text-base font-bold mt-[20px]">{item.title}</div>
                  <div className="text-sm mt-[10px]">{item.place}</div>
                  <div className="text-sm mt-[10px]">{item.period}</div>
                </div>

                <div className="w-[80px] h-[110px] bg-gray-200 rounded-md">
                  <img
                    src={item.imageUrl}
                    alt="Consert Image"
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>
            ))}

          {data?.length === 0 && <div>예정된 공연일정이 없습니다.</div>}
        </div>
      </div>
    </div>
  );
};

export default MusicSchedule;
