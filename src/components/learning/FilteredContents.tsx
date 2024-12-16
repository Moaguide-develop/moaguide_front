import Image from 'next/image';
import defaultImage from '../../../public/images/learning/learning_img.svg';

interface FilteredContentsProps {
  contents: any[];
  total: number;
  page: number;
  size: number;
  onPageChange: (newPage: number) => void;
}

const FilteredContents = ({
  contents,
  total,
  page,
  size,
  onPageChange,
}: FilteredContentsProps) => {
  const totalPages = Math.ceil(total / size);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  return (
    <div className='mt-10'>
      <div className="space-y-10">
        {contents.length > 0 ? (
          contents.map((item) => (
            <div key={item.contentId} className="flex items-center gap-4">
              <div className="w-64 h-40 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.img_link || defaultImage}
                  alt={item.title}
                  width={128}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="h-full flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <div className="justify-end text-xs text-gray-500 mt-4 flex items-center gap-4">
                  <span>{formatDate(item.date)}</span>
                  <span>❤ {item.likes}</span>
                  <span>👁 {item.views}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">데이터가 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <ul className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <li key={pageNum}>
                  <button
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center border rounded ${
                      page === pageNum
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilteredContents;