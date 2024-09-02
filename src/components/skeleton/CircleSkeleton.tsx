export default function CircleSkeleton({ className = '' }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999]">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-t-normal border-gray-300" />
    </div>
  );
}
