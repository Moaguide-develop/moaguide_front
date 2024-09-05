import RecentlyIssueIndex from '@/components/recentlyIssue/Index';
import Navbar from '@/components/common/Navbar';
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
