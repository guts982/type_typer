import React from 'react';
import Link from 'next/link';
import SceneContainer from '@/components/3d/SceneContainer';

const page3d = () => {
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-[#C06C84]'>
          <div className=''>
          <h2 className='font-semibold text-lg p-4 w-full text-center'>3d Typer</h2>
            <div className="flex gap-2">
                <Link href="/" className='bg-blue-500 rounded-md p-2 text-white'>Home</Link>
                <Link href="/classic" className='bg-blue-500 rounded-md p-2 text-white'>Classic</Link>
            </div>
          </div>
          <div className='flex-grow w-full h-full border-2 '>
            <SceneContainer />
          </div>
        </div>
    );
};

export default page3d;