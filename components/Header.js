import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className='h-auto w-full bg-slate-900'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 py-4'>
        <Link href='/'>
          <a className='font-bold tracking-widest text-2xl italic underline text-gray-100'>NextAuthApp</a>
        </Link>
        <div>
          {status === 'authenticated' && (
            <Menu className='relative w-auto h-auto' as='div'>
              <Menu.Button className='bg-transparent w-auto h-auto flex items-center text-white'>
                {session?.user.image && (
                  <div className='mr-2 overflow-hidden mt-2'>
                    <Image className='rounded-full' src={session?.user.image} width={40} height={40} />
                  </div>
                )}
                {session?.user.name || session?.user.email} <ChevronDownIcon className='w-4 h-4 ml-2' />
              </Menu.Button>
              <Menu.Items
                as='div'
                className='absolute  bg-white right-1 p-2 flex flex-col space-y-2 rounded-md w-36 bottom-0 translate-y-[110%]'
              >
                <Menu.Item className='hover:bg-slate-200 py-1 px-2 rounded-md flex items-center'>
                  {({ active }) => (
                    <button onClick={() => signOut()}>
                      <LogoutIcon className='w-4 h-4 mt-[0.2rem] mr-2' />
                      <span className='text-md font-light'>Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}
