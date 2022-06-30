import React, { useLayoutEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import ErrorImage from '../assets/error.png';

export default function error() {
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    const urlSearchParams = new window.URLSearchParams(window.location.search);
    setError(urlSearchParams.get('error'));
  }, []);

  return (
    <Layout>
      <div className='max-w-xl mx-auto mt-24 text-slate-100 text-4xl text-center font-bold tracking-wider'>
        <Image src={ErrorImage} width={500} height={400} layout='responsive' />
      </div>
    </Layout>
  );
}
