import Link from 'next/link';
import React from 'react';

const ShowEmailInfo = () => {
  return (
    <section className="max-w-[340px] w-full mx-auto mt-[76px]">
        <div className="text-heading3 ">
          <h2 className="text-xl text-center font-bold mb-6 text-left">
            가입하신<br />
            <span className="text-purple-600">이메일 정보</span>입니다
          </h2>
        </div>
      <div className="py-8 px-4 text-center bg-gray-100 rounded-lg mb-6">Moaguide@gmail.com</div>
      <Link href={'/sign'} className='cursor-pointer'>
      <button className="flex items-center justify-center px-5 py-[14px] mt-[60px] w-full rounded-[12px] bg-gradient2 text-heading4 text-white">
        로그인으로 돌아가기
      </button>
      </Link>
    </section>
  );
};

export default ShowEmailInfo;
