import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className='h-screen w-full overflow-hidden bg-gray-800'>
      <Header />
      {children}
    </div>
  );
}
