import Container from '@/components/common/Container';
import Navbar from '@/components/common/Navbar';
import HomeFooter from '@/components/home/HomeFooter';
import QuizeIndex from '@/components/quize/QuizeIndex';

const QuizePage = () => {
  return (
    <div>
      <Navbar />
      <QuizeIndex />
      <HomeFooter />
    </div>
  );
};

export default QuizePage;
