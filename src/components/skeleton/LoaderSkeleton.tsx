export default function LoaderSkeleton({ className = '' }) {
  return (
    <div className={`flex gap-4 justify-center mt-12 ${className}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-600" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-600" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-600" />
    </div>
  );
}
