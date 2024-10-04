import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className=" w-full mx-auto desk:max-w-[1000px] ">{children}</div>;
};

export default Container;
