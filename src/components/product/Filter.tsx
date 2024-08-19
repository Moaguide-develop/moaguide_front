import Image from 'next/image';
const Filter = () => {
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
        <div key={key} className=" ">
          <div className=" flex flex-row justify-center items-center ">
            <div className="flex flex-col  justify-center items-center">
              {key === 'all' ? (
                <div className="flex justify-center items-center w-[60px] h-[60px] text-[#713ce2]">
                  <div className="flex justify-center items-center h-[60px] w-[60px] p-3.5 bg-[#f7f7f7] rounded-xl border border-[#eceef2] gap-1 text-sm font-bold">
                    {FilterElement[key].img}
                  </div>
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

              <span className="text-sm font-bold mt-[8px]">
                {FilterElement[key].name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
