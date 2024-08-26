import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
const Filter = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const sort = searchParams.get('kind');
  console.log(sort);

  const handleClick = (key: string) => {
    params.set('kind', key);
    router.replace(`?${params.toString()}`);
  };
  interface FilterElementType {
    [key: string]: { name: string; img: string };
  }

  const FilterElement: FilterElementType = {
    all: { name: '전체', img: 'ALL' },
    house: { name: '부동산', img: 'OfficeBuilding.svg' },
    music: { name: '음악저작권', img: 'MusicalNote.svg' },
    cow: { name: '한우', img: 'CowFace.svg' },
    art: { name: '미술', img: 'FramedPicture.svg' },
    contents: { name: '콘텐츠', img: 'ClapperBoard.svg' }
  };

  return (
    <div className=" h-[85px] flex flex-row desk2:justify-center md:gap-20 my-[28px] desk:mx-[20px] desk:justify-start  desk:gap-4  overflow-x-scroll overflow-y-hidden scrollbar-hide">
      {Object.keys(FilterElement).map((key) => (
        <div key={key} className=" cursor-pointer ">
          <div className=" flex flex-row justify-center items-center ">
            <div
              className="flex flex-col  justify-center items-center"
              onClick={() => handleClick(key)}>
              {key === 'all' ? (
                sort === key || sort === null ? (
                  <div className="flex justify-center items-center w-[60px] h-[60px] text-[#713ce2] ">
                    <div className="flex justify-center items-center h-[60px] w-[60px] p-3.5 bg-[#f7f7f7] rounded-xl border  gap-1 text-sm font-bold border-[#713CE2]">
                      {FilterElement[key].img}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-[60px] h-[60px] text-[#713ce2]">
                    <div className="flex justify-center items-center h-[60px] w-[60px] p-3.5 bg-[#f7f7f7] rounded-xl border border-[#eceef2] gap-1 text-sm font-bold">
                      {FilterElement[key].img}
                    </div>
                  </div>
                )
              ) : sort === key ? (
                <div className="h-[60px]  w-[60px]  p-3.5 bg-[#f7f7f7] rounded-xl border border-[#713CE2] justify-start items-start gap-1  ">
                  <Image
                    src={`/images/product/${FilterElement[key].img}`}
                    alt={FilterElement[key].name}
                    width={60}
                    height={60}
                  />
                </div>
              ) : (
                <div className="h-[60px]  w-[60px]  p-3.5 bg-[#f7f7f7] rounded-xl border border-[#eceef2] justify-start items-start gap-1 ">
                  <Image
                    src={`/images/product/${FilterElement[key].img}`}
                    alt={FilterElement[key].name}
                    width={60}
                    height={60}
                  />
                </div>
              )}
              {sort === key || (sort == null && key == 'all') ? (
                <span className="text-sm font-bold mt-[8px] text-[#713CE2]">
                  {FilterElement[key].name}
                </span>
              ) : (
                <span className="text-sm font-bold mt-[8px]">
                  {FilterElement[key].name}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
