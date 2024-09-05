import RecentlyIssueIndex from '@/components/recentlyIssue/Index';
import Navbar from '@/components/common/Navbar';
import { Suspense } from 'react';
const NewIssuePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <RecentlyIssueIndex />
      </div>
    </Suspense>
  );
};

export default NewIssuePage;
