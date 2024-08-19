interface NavBarProps {
  sort: string;
  setSort: (value: string) => void;
}

const NavBar = ({ sort, setSort }: NavBarProps) => {
  return (
    <div className="mt-[28px]">
      <div className="shadow-custom-light border-b border-gray100 ">
        <div className="max-w-[1000px] mx-auto flex items-center ">
          <div
            onClick={() => {
              setSort('profit');
            }}
            className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${sort === 'profit' ? ' text-black border-b-[2px] border-purple-700' : 'text-gray300'}
        `}>
            기본정보
          </div>
          <div
            onClick={() => {
              setSort('detail');
            }}
            className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${sort === 'detail' ? ' text-black border-b-[2px] border-purple-700' : 'text-gray300'}
        `}>
            상세정보
          </div>
          <div
            onClick={() => {
              setSort('report');
            }}
            className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${sort === 'report' ? ' text-black border-b-[2px] border-purple-700' : 'text-gray300'}
        `}>
            리포트
          </div>
          <div
            onClick={() => {
              setSort('news');
            }}
            className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${sort === 'news' ? ' text-black border-b-[2px] border-purple-700' : 'text-gray300'}
        `}>
            뉴스
          </div>
          <div
            onClick={() => {
              setSort('public');
            }}
            className={`px-4 py-3 flex-1 flex justify-center items-center cursor-pointer text-body5 desk2:text-heading4
        ${sort === 'public' ? ' text-black border-b-[2px] border-purple-700' : 'text-gray300'}
        `}>
            공시
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
