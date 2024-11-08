export default function QuizSkeleton({ className = '' }) {
    return (
      <div className={`min-h-[calc(100dvh-75.5px)] flex flex-col sm:min-h-[calc(100vh-60px)] items-center justify-center ${className}`}>
        <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-8 border-t-normal border-gray-300" />
      </div>
    );
  }