'use client';
import Container from '@/components/common/Container';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';
import { useQuizDetail } from '@/factory/Quiz/QuizDetail';
import QuizBanner from './QuizBanner';

const QuizePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { data: QuizData, error, isLoading } = useQuizDetail();
  const quiz = { id: QuizData?.quiz.id ?? 0, title: QuizData?.quiz.title ?? '' };
  const handleStartQuiz = () => {
    if (isLoggedIn) {
      router.push(`/quiz/${QuizData?.quiz?.id}`);
    } else {
      alert('로그인 후 시험응시가 가능합니다.');
      router.push('/sign');
    }
  };
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중에는 Loading 메시지를 표시
  }
  if (error) {
    console.error('퀴즈 데이터를 가져오는 데 실패했습니다:', error);
    return <div>Failed to load quiz data</div>;
  }
  return (
    <div>
      {/* Quiz Banner */}
      <QuizBanner quiz={quiz} />

      <Container>
        <div className="flex flex-col items-center border-b border-gray-200">
          {/* Main Info Section */}
          <div className="text-center my-16">
            <div className="text-4xl font-bold text-[#6F36E8] mb-12">
              💸 시험은 2주에 1회 진행됩니다! 💸
            </div>

            <div className="text-4xl font-bold text-black mb-2">
              총 {QuizData?.quiz.questions ?? 0}문제
            </div>
            <div className="text-4xl font-bold text-black mb-10">제한시간: 30분</div>

            <div className="text-3xl font-semibold text-gray-800 mb-6">
              제한시간 30분 (시간 초과 시 자동 제출)
            </div>
            <div className="text-3xl font-semibold text-gray-800 mb-2">문제당 3점</div>
            <div className="text-3xl font-semibold text-gray-800">
              최고득점 90점 + (가점 10점) = 100점
            </div>
          </div>
        </div>
      </Container>

      <div className="border-b-2 border-gray-200"></div>

      <Container>
        {/* Details Section */}
        <div className="text-left my-16 text-gray-700 w-full max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">시험범위: </span>
            <span className="text-2xl font-semibold text-black">
              모아가이드 [학습하기 탭 - 재테크 가이드 (15문제) / 조각투자 가이드 (15문제)]
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">시험 응시 자격: </span>
            <span className="text-2xl font-semibold text-black">
              모아가이드 회원가입 완료자
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">시험 기간: </span>
            <span className="text-2xl font-semibold text-black">
              ~ {QuizData?.quiz.endDate ?? ''} (1계정 1회 참여 가능)
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">최종 순위 발표일: </span>
            <span className="text-2xl font-semibold text-black">
              {QuizData?.quiz.ranking ?? ''}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-black">경품 지급일: </span>
            <span className="text-2xl font-semibold text-black">
              {QuizData?.quiz.paymentDate ?? ''}
            </span>
          </div>
        </div>
      </Container>

      <div className="border-b-2 border-gray-200"></div>

      <Container>
        {/* Additional Information */}
        <div className="text-center my-10 text-gray-800">
          {/* 경고 메시지 */}
          <div className="text-red-500 text-xl font-semibold mb-6">
            시험을 시작한 후 중간에 이탈시 재응시가 불가능합니다.
          </div>
          <div className="text-yellow-600 text-lg font-semibold mb-4 flex items-center justify-center gap-1">
            <span>⚠️ 충분히 학습하고 신중히 진행해주세요 ⚠️</span>
          </div>
          <div className="text-purple-600 text-lg font-semibold mb-6 flex items-center justify-center gap-1">
            <span>⚠️ 동점자 발생시 시험을 빨리 푼 순서로 순위가 배정됩니다 ⚠️</span>
          </div>

          {/* 추가 점수 제공 안내 */}
          <div className="text-lg font-semibold mb-4 flex items-center justify-center gap-1">
            <span className="text-red-600">📍</span> 추가 점수 제공
            <span className="text-red-600">📍</span>
          </div>
          <div className="text-base text-gray-700">
            <div>- 모아가이드 인스타그램 투자능력고사 게시글</div>
            <div>@moaguide.official 태그하여 스토리공유 (+5점)</div>
            <div>- 모아가이드 프리미엄 콘텐츠 구독자 (+5점)</div>
          </div>

          {/* 주의사항 */}
          <div className="text-red-500 text-sm font-normal mt-6">
            ❗ 가점 제공을 위한 정보가 거짓으로 밝혀질 시 점수가 차감될 수 있습니다 ❗
          </div>
        </div>
      </Container>

      <div className="border-b-2 border-gray-200"></div>

      <Container>
        {/* Prize Section */}
        <div className="text-center my-8">
          <div className="font-semibold text-lg">🎁 경품 안내 🎁</div>
          <div className="whitespace-pre-line text-gray-700">
            {QuizData?.quiz.prize ?? ''}
          </div>
        </div>
      </Container>

      <Container>
        {/* Footer Button */}
        <div className="text-center my-8">
          <button
            onClick={handleStartQuiz}
            className="w-full max-w-xs mx-auto bg-gradient-to-r from-[#713CE2] to-[#5200FF] text-white py-3 px-8 rounded-lg text-lg font-semibold">
            시험 시작하기
          </button>
        </div>
      </Container>
    </div>
  );
};

export default QuizePage;
