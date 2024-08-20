import Navbar from '@/components/common/Navbar';
import RecentlyIssueIndex from '@/components/recentlyIssue/Index';

const NewIssuePage = async ({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <Navbar />
      <RecentlyIssueIndex />
    </div>
  );
};

export default NewIssuePage;
