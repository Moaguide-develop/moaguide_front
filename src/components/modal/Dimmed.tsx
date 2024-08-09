import React, { ReactNode } from 'react';

const Dimmed = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-30 z-50 flex justify-center items-start">
      {children}
    </div>
  );
};

export default Dimmed;
