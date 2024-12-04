'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';

const BlurWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  return (
    <div>
      {!isLoggedIn ? (
        <div className="relative">
          <div className="absolute inset-0 flex justify-center mt-10  z-[2000]">
            <div className="desk:w-[300px] desk2:w-[400px] h-[150px] rounded-[12px] bg-white shadow-lg shadow-gray-200 flex flex-col justify-center items-center">
              <div className="text-lg font-bold mb-3">로그인 후 이용 가능합니다</div>
              <button
                className="flex justify-center bg-black text-white items-center desk:w-[200px] desk2:w-[300px] h-[50px] rounded-[12px]"
                onClick={() => {
                  router.replace('/sign');
                }}>
                로그인 하러 가기
              </button>
            </div>
          </div>

          <div className="h-3/4 blur-lg bg-white/30 z-[20] pointer-events-none">
            {children}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default BlurWrapper;
