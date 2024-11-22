'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';
import { useQuizDetail } from '@/factory/Quiz/QuizDetail';
import QuizBanner from './QuizBanner';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QuizSkeleton from '../skeleton/QuizSkeleton';
import { axiosInstance } from '@/service/axiosInstance';

const QuizePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { data: QuizData, error, isLoading } = useQuizDetail();
  const quiz = { id: QuizData?.quiz.id ?? 0, title: QuizData?.quiz.title ?? '' };
  const [isParticipated, setIsParticipated] = useState(false); // 참여 여부 상태
  const hasFetched = useRef(false);
  const [insta, setInsta] = useState('');
  const [naver, setNaver] = useState('');

  // 날짜 형식 변환 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  };

  const handleStartQuiz = () => {
    if (isLoggedIn && !isParticipated) {
      sessionStorage.setItem('insta', insta);
      sessionStorage.setItem('naver', naver);
      // router.push(`/quiz/test`);
      alert('시험 응시기간이 지났습니다.');
      // if (QuizData?.quiz.endDate) {
      //   const now = new Date();
      //   const currentTime = new Date(QuizData?.quiz.endDate);
      //   currentTime.setHours(23, 59, 59, 0); // 오후 11시 59분 59초로 시간 설정

      //   if (now >= currentTime) {
      //     alert('시험 응시기간이 지났습니다.');
      //     router.push('/');
      //   }
      //   router.push(`/quiz/test`);
      // }
    } else if (!isLoggedIn) {
      alert('로그인 후 시험응시가 가능합니다.');
      router.push('/sign');
    }
  };

  useEffect(() => {
    const checkQuizParticipation = async () => {
      if (!hasFetched.current) {
        try {
          hasFetched.current = true;
          await axiosInstance.get('/quiz/check/1');
        } catch (error: any) {
          if (error.response && error.response.status === 409) {
            setIsParticipated(true); // 참여 완료로 상태 업데이트
          }
        }
      }
    };
    checkQuizParticipation();
  }, []);

  if (isLoading) {
    return <QuizSkeleton />;
  }

  return (
    <div className="min-h-[calc(100dvh-134.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] text-center sm:mb-0 w-[100%] mx-auto sm:min-w-[640px] justify-between sm:justify-start font-[Pretendard]">
      <QuizBanner quiz={quiz} />

      <div className="flex flex-col items-center border-b-2 max-md:border-b border-gray-200 w-full"></div>

      <div className="text-center my-16">
        <div className="text-2xl max-sm:text-lg font-bold text-[#6F36E8] mb-12">
          💸 시험은 2주에 1회 진행됩니다! 💸
        </div>
        <div className="text-2xl max-sm:text-lg font-bold text-black mb-2">
          총 {QuizData?.quiz.questions ?? 0}문제
        </div>
        <div className="text-2xl max-sm:text-lg font-bold text-black mb-10">
          제한시간: 30분
        </div>
        <div className="text-xl max-sm:text-base font-medium text-black mb-6">
          제한시간 30분 (시간 초과 시 자동 제출)
        </div>
        <div className="text-xl max-sm:text-base font-medium text-black mb-2">
          문제당 3점
        </div>
        <div className="text-xl max-sm:text-base font-medium text-black">
          최고득점 90점 + (가점 10점) = 100점
        </div>
      </div>

      <div className="mx-auto">
        <div className="text-left max-md:text-center max-sm:px-8 my-8 w-full">
          <div className="mb-6 ">
            <span className="text-xl max-md:text-title2 font-bold text-black">
              시험범위:{' '}
            </span>
            <span className="text-lg max-md:text-body2 font-medium text-black">
              {QuizData?.quiz.questionRange ?? ''}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-xl max-md:text-title2 font-bold text-black">
              시험 응시 자격:{' '}
            </span>
            <span className="text-lg max-md:text-body2 font-medium text-black">
              모아가이드 회원가입 완료자
            </span>
          </div>
          <div className="mb-6">
            <span className="text-xl max-md:text-title2 font-bold text-black">
              시험 기간:{' '}
            </span>
            <span className="text-lg max-md:text-body2 font-medium text-black">
              ~ {formatDate(QuizData?.quiz.endDate ?? '')} (1계정 1회 참여 가능)
            </span>
          </div>
          <div className="mb-6">
            <span className="text-xl max-md:text-title2 font-bold text-black">
              최종 순위 발표일:{' '}
            </span>
            <span className="text-lg max-md:text-body2 font-medium text-black">
              {formatDate(QuizData?.quiz.ranking ?? '')}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-xl max-md:text-title2 font-bold text-black">
              경품 지급일:{' '}
            </span>
            <span className="text-lg max-md:text-body2 font-medium text-black">
              {formatDate(QuizData?.quiz.paymentDate ?? '')}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center max-md:text-heading3 text-[#FF0000] text-2xl font-bold mb-2">
        시험을 시작한 후 중간에 이탈시
        <br /> 재응시가 불가능합니다.
      </div>

      <div className="border-b-2 max-md:border-b border-gray-200 w-full mb-8"></div>

      <div className="text-center mb-8">
        <div className="mb-4 flex text-2xl items-center justify-center gap-1">
          <span className="text-[#FFE100] font-medium">⚠️</span>
          <span className="text-[#FF0000] max-md:text-body3 font-medium">
            충분히 학습하고 신중히 진행해주세요
          </span>
          <span className="text-[#FFE100] font-medium">⚠️</span>
        </div>
        <div className="mb-6 text-2xl flex items-center justify-center gap-1">
          <span className="text-black font-medium">⚠️</span>
          <span className="text-[#6F36E8] max-md:text-body7 font-semibold">
            동점자 발생시 시험을 빨리 푼 순서로 순위가 배정됩니다
          </span>
          <span className="text-black font-medium">⚠️</span>
        </div>
        <div className="text-2xl max-md:text-caption3 font-semibold mb-4 flex items-center justify-center gap-1">
          📍 추가 점수 제공 📍
        </div>
        <div className="text-2xl max-md:text-caption3 font-semibold text-gray-700">
          <div>- 모아가이드 인스타그램 투자능력고사 게시글</div>
          <div>@moaguide.official 태그하여 스토리공유 (+5점)</div>
          <div>- 모아가이드 프리미엄 콘텐츠 구독자 (+5점)</div>
        </div>
        <div className="text-black max-md:text-caption4 text-xl font-medium mt-6">
          ❗ 가점 제공을 위한 정보가 거짓으로 밝혀질 시 점수가 차감될 수 있습니다 ❗
        </div>
      </div>

      <div className="border-b-2 max-md:border-b border-gray-200 w-full"></div>

      <div className="text-center max-md:mx-8 my-8">
        <Image
          src={`https://d2qf2amuam62ps.cloudfront.net/img/prize${quiz.id}.svg`}
          width={1000}
          height={455}
          alt="Quiz Prize"
          className="max-md:w-[1000px] mx-auto"
        />
      </div>

      <div className="border-b-2 max-md:border-b border-gray-200 w-full"></div>

      <div className="text-center max-md:text-caption3 my-auto py-8 font-medium text-2xl">
        <div>순위는 실시간으로 모아가이드 홈페이지에서 확인이 가능합니다</div>
        <div>(별명으로 게시)</div>
      </div>

      <div className="border-b-2 max-md:border-b border-gray-200 my-auto"></div>

      <div className="max-w-[520px] max-md:text-caption3 my-4 items-center mx-auto text-center text-black text-xl font-semibold font-['Pretendard']">
        <div>
          인스타그램 스토리를 통해 @moaguide.official 태그 후 게시물을 공유하셨다면
        </div>
        <div>본인의 인스타그램 아이디를 입력해주세요!</div>
        (가점 제공 확인용)
      </div>

      <div className="w-full max-md:max-w-72 max-w-sm mx-auto">
        <input
          type="text"
          value={insta}
          onChange={(e) => setInsta(e.target.value)}
          className="w-full max-w-[380px] max-md:text-caption3 px-4 py-[14px] bg-bg rounded-full outline-none text-body2 focus:outline-normal"
          placeholder="아이디 입력"
        />
      </div>

      <div className="max-w-[390px] max-md:text-caption3 mt-4 mb-2 items-center mx-auto text-center text-black text-xl font-semibold">
        프리미엄 콘텐츠(학습하기)를 구독하셨다면
        <br />
        성함과 구독하신 아이디를 입력해주세요.
      </div>

      <div className="max-w-[350px] max-md:text-caption1 mb-4 items-center mx-auto text-center text-black text-base">
        (ex. 모아가이드 / moaguide@naver.com)
      </div>

      <div className="mt-2 w-full max-md:max-w-72 max-w-sm mx-auto">
        <input
          type="text"
          value={naver}
          onChange={(e) => setNaver(e.target.value)}
          className="w-full max-w-[380px] max-md:text-caption3 px-4 py-[14px] bg-bg rounded-full outline-none text-body2 focus:outline-normal"
          placeholder="성함/이메일 입력"
        />
      </div>

      <div className="text-center my-8">
        <button
          onClick={handleStartQuiz}
          className={`w-full max-md:text-caption3 max-md:w-60 max-w-xs mx-auto py-3 px-8 rounded-full text-lg font-semibold ${
            isParticipated
              ? 'bg-gray100 text-gray400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#713CE2] to-[#5200FF] text-white'
          }`}>
          {isParticipated ? '참여완료' : '지금 시작하기'}
        </button>
      </div>
    </div>
  );
};

export default QuizePage;
