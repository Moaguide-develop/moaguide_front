import Navbar from '@/components/common/Navbar';
import LearningPageClient from '@/components/learning/LearningPageClient';

const LearningPage = async () => {

  const response = await fetch('http://43.200.90.72/contents/overview', { cache: 'no-store' });

  if (!response.ok) {
    console.error('Failed to fetch Overview API');
    return <div>데이터를 가져오지 못했습니다.</div>;
  }

  const initialData = await response.json();

  return (
    <div>
      <Navbar />
      <LearningPageClient initialData={initialData} />
    </div>
  );
};

export default LearningPage;