import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/image/logo90x90.png'

export default function Home() {
  return (
    <main className="flex justify-center bg-black bg-opacity-90 min-h-screen">
      <div className="flex flex-row flex-wrap  align-middle p-10 bg-gray-950 bg-opacity-50">
        <Image 
          src={logo} 
          alt="Logo SDQ Bina Mulya" 
        />
        <div className="flex flex-col align-middle p-2">
          <h3 className="text-white text-4xl">SDQ Bina Mulya</h3>
          <p className='text-gray-600'>Aplikasi SPP</p>
        </div>
      </div>
    </main>
  )
}
