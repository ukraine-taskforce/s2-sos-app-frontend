import React, { FC } from 'react';

export const Layout: FC = ({ children }) => {
  return (
    <main className="bg-gray-50 h-screen p-12">
      {children}
    </main>
  );
};
