import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[360px] mx-auto desk:max-w-[1000px] w-[90%] lg:w-[100%] mb-[50px]">
      {children}
    </div>
  );
};

export default Container;
