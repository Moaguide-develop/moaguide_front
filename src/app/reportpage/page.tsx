import NavBar from '@/components/product/detail/NavBar';
import ReportIndex from '@/components/report/ReportIndex';
import Navbar from '@/components/common/Navbar';
const ReportPage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <Navbar />
      <ReportIndex />
    </div>
  );
};

export default ReportPage;
