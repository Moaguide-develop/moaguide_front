const Public = () => {
  const MOCK = {
    notice: [
      {
        id: 1,
        title: '실험용 공지',
        noticeDay: '2024-07-25',
        content: null
      },
      {
        id: 2,
        title: '실험용 공지',
        noticeDay: '2024-07-25',
        content: null
      },
      {
        id: 3,
        title: '실험용 공지',
        noticeDay: '2024-07-25',
        content: null
      },
      {
        id: 4,
        title: '실험용 공지',
        noticeDay: '2024-07-25',
        content: null
      }
    ],
    total: 2,
    page: 1,
    size: 10
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-[32px]">
      {MOCK.notice.map((item) => {
        return (
          <div
            key={item.id}
            className=" flex flex-col border-b-[1px] border-gray-200 py-[20px] px-[20px] rounded-lg">
            <div className="text-base font-bold mb-[12px]">{item.title}</div>
            <div className="text-gray-400">{item.noticeDay}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Public;
