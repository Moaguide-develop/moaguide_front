import Navbar from '@/components/common/Navbar';
import ReportIndex from '@/components/report/ReportIndex';

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
