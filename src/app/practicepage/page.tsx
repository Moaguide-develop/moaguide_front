import Navbar from '@/components/common/Navbar';
import PracticeIndex from '@/components/practice/PracticeIndex';

const PracticePage = () => {
  return (
    <div className='min-h-[calc(100dvh-131.5px)] flex flex-col sm:min-h-[100vh] sm:mb-0'>
      <Navbar />
      <PracticeIndex />
    </div>
  );
};

export default PracticePage;
