import React from 'react';
import { Dialog as HDialog } from '@headlessui/react';

export default function Dialog({ open, closeDialog, message }) {
  return (
    <HDialog className='relative z-50' open={open} onClose={closeDialog}>
      <div className='fixed inset-0 bg-black/30' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <HDialog.Panel className='bg-white max-w-md w-full h-auto px-8 pb-6 pt-4 rounded-lg'>
          <HDialog.Title className='text-xl mb-4 font-normal'>Authentication Error</HDialog.Title>

          {typeof message === 'string' ? <p className='text-md text-gray-500 mb-3'>{message}</p> : message}

          <button
            className='py-2 px-6 text-md bg-sky-400 rounded-md outline-none text-white font-bold hover:bg-sky-300'
            onClick={closeDialog}
          >
            Close
          </button>
        </HDialog.Panel>
      </div>
    </HDialog>
  );
}
