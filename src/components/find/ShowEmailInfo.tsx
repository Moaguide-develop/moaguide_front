import Link from 'next/link';
import React from 'react';

const ShowEmailInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center max-w-[340px] w-full mx-auto min-h-[calc(100vh-100px)] relative">
      <div className="text-heading3">
        <h2 className="text-xl text-center font-bold">
          가입하신<br />
          <span className="text-purple-600">이메일 정보</span>입니다
        </h2>
      </div>
      <div className="w-full py-8 px-4 text-center bg-gray-100 rounded-lg my-10">Moaguide@gmail.com</div>
      <Link href={'/sign'}>
        <button className='w-full max-w-[340px] py-3 rounded-[12px] text-white text-lg font-bold bg-gradient2 text-heading4 text-white absolute bottom-0 left-0 right-0 mx-auto'>
          로그인으로 돌아가기
        </button>
      </Link>
    </section>
  );
};

export default ShowEmailInfo;
