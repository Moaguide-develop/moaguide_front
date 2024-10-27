import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const Schedule = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.moaguide.com/detail/content/sub/${lastSegment}`
    );
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['Schedule', lastSegment],
    queryFn: fetchData
  });

  const releaseDate = new Date(data?.stats[0].releaseDate); // 예제 날짜 변경
  const dates = [];
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열

  for (let i = -6; i <= 6; i++) {
    const newDate = new Date(releaseDate);
    newDate.setDate(newDate.getDate() + i);
    dates.push({
      date: newDate,
      dayOfWeek: daysOfWeek[newDate.getDay()] // 요일 계산
    });
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-lg font-bold mb-4">
        {releaseDate.getFullYear()}년 {releaseDate.getMonth() + 1}월
      </div>
      <div className="grid grid-cols-1 desk:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-2">
        {dates.map((item, index) => (
          <div
            key={index}
            className={`w-[70px] h-14 flex flex-col items-center justify-center border p-2 ${
              item.date.toISOString().split('T')[0] ===
              releaseDate.toISOString().split('T')[0]
                ? 'border-blue-500 bg-blue-200 border-1 '
                : 'border-gray-200'
            }
            
              
            `}>
            <div>{item.dayOfWeek}</div>
            <div>{item.date.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
