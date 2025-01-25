import { logout } from '@/service/auth';
import { useAuthStore } from '@/store/userAuth.store';
import { removeCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    removeCookie('access_token');
    removeCookie('refresh');
    router.push('/sign');
    sessionStorage.clear();
  };

  return { handleLogout };
};

export default useLogout;
