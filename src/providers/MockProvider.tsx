import initMocks from '@/mocks';

if (
  process.env.NEXT_PUBLIC_API_MOCKING === 'enable' &&
  process.env.NODE_ENV === 'development'
) {
  initMocks();
}

function MockProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default MockProvider;
