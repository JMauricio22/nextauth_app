import Layout from '../components/Layout';
import { getProviders, signIn } from 'next-auth/react';
import Dialog from '../components/Dialog';
import useDialog from '../hooks/useDialog';
import { useEffect, useState } from 'react';

const colors = {
  Facebook: 'btn-facebook',
  GitHub: 'btn-github',
  Google: 'btn-google',
};

const Signin = ({ providers }) => {
  const [signInError, setSigInError] = useState('');
  const { open, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get('error');
    if (error) {
      setSigInError(error);
      openDialog();
    }
  }, []);

  return (
    <Layout>
      <Dialog
        open={open}
        closeDialog={closeDialog}
        message={
          <p className='text-md text-gray-500 mb-3'>
            Authentication failed and throws the following error: <span className='font-bold'> {signInError} </span>
          </p>
        }
      />
      <div className='w-full max-w-lg mx-auto text-center mt-40 bg-black/10 py-8 px-2 rounded-lg'>
        <h1 className='font-bold text-4xl mb-8 text-slate-100'>Sign In With</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className='mb-4'>
            <button
              className={`btn ${colors[provider.name]}`}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
                })
              }
            >
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
