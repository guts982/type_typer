import MainComponent from '@/components/MainComponent'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='h-screen w-screen flex flex-col sm:flex-row 
    
    '>
      <div className="h-full w-full flex justify-center items-center bg-orange-500 group hover:bg-orange-300">
        <Link href="/classic" className='font-semibold text-4xl  group-hover:animate-bounce '>Classic</Link>
      </div>
      <div className="h-full w-full flex justify-center items-center bg-violet-600 text-white group hover:bg-violet-800">
      <Link href="/3d" className='font-semibold text-4xl  group-hover:animate-bounce '>3d</Link>
      </div>
    </div>
  )
}
