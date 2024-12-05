import Navbar from '@/components/common/Navbar';
import LatestNewsClipping from '@/components/learning/LatestNewsClipping';
import PopularContents from '@/components/learning/PopularContents';
import RecentContents from '@/components/learning/RecentContents';

const LearningPage = async () => {
  // API 호출
  const response = await fetch('http://43.200.90.72/contents/overview', {
    cache: 'no-store', // 캐싱 없이 항상 최신 데이터를 가져옴
  });

  if (!response.ok) {
    console.error('Failed to fetch Overview API');
    return <div>데이터를 가져오지 못했습니다.</div>;
  }

  const { popularContents, recentContents, latestNewsClipping } = await response.json();

  return (
    <div>
      <Navbar />
        {/* 인기 콘텐츠 섹션 */}
        <PopularContents contents={popularContents} />

        {/* 최신 콘텐츠 섹션 */}
        <RecentContents contents={recentContents} />

        {/* 뉴스 클리핑 섹션 */}
        <LatestNewsClipping contents={latestNewsClipping} />
      </div>
  );
};

export default LearningPage;