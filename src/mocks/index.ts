const initMocks = async () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { server } = await import('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};
export default initMocks;
