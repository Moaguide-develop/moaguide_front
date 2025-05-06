import { cookies } from 'next/headers';
import Navbar from '@/components/common/Navbar';
import LearningPageClient from '@/components/learning/LearningPageClient';

const LearningPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch('https://moaguide.n-e.kr/contents/overview', {
    method: 'GET',
    headers,
    cache: 'no-store'
  });

  if (!response.ok) {
    console.error('Failed to fetch Overview API');
    return <div>데이터를 가져오지 못했습니다.</div>;
  }

  const initialData = await response.json();

  return (
    <div className="min-h-[calc(100dvh-135.5px)] flex flex-col">
      <Navbar />
      <LearningPageClient initialData={initialData} />
    </div>
  );
};

export default LearningPage;
