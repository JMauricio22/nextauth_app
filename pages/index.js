import Layout from '../components/Layout';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);

  return (
    <Layout>
      <div className='w-auto mx-auto mt-24'>
        <h1 className='text-center font-bold text-4xl text-slate-100'>
          Welcome <span className='underline text-slate-200'>{session?.user?.name || session?.user?.name}</span> 🥳
        </h1>
      </div>
    </Layout>
  );
};

export default Home;
