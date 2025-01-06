'use client';
import RecentlyIssueIndex from '@/app/newissue/(recentlyIssue)/Index';
import Navbar from '@/components/common/Navbar';
const NewIssuePage = () => {
  return (
    <div>
      <Navbar />
      <RecentlyIssueIndex />
    </div>
  );
};

export default NewIssuePage;
