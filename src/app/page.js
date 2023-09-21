import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/image/logo90x90.png'

export default function Home() {
  return (
    <main className="flex justify-center bg-black bg-opacity-90 min-h-screen">
      <div className="text-gray-200 shadow rounded p-10 bg-gray-950 bg-opacity-50 h-fit my-auto">
        <div className="flex flex-row flex-wrap align-middle">
          <Image 
            src={logo} 
            alt="Logo SDQ Bina Mulya" 
            width="90px"
            height="90px"
          />
          <div className="flex flex-col align-middle p-2">
            <h3 className="text-white text-4xl">SDQ Bina Mulya</h3>
            <p className='text-gray-600'>Aplikasi SPP</p>
          </div>
        </div>
        <form className='flex flex-col mt-5 ' onSubmit="">
          <div className="my-3">
            <label className='block text-sm font-light mb-1' htmlFor="email">E-Mail or Username</label>
            <input autoComplete='off' className='text-sm transition-all bg-gray-950 bg-opacity-20 appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-gray-950 focus:bg-opacity-50 focus:outline focus:outline-gray-800 focus:outline-offset-2' type="text" id='email' name='email'/>
          </div>
          <div className="my-3">
            <div className="flex flex-row justify-between mb-1">
              <label className='block text-sm font-light' htmlFor="Password">Password</label>
              <p className='text-gray-500 cursor-pointer'>Lupa Password?</p>
            </div>
            <input autoComplete='off' className='text-sm transition-all bg-gray-950 bg-opacity-20 appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-gray-950 focus:bg-opacity-50 focus:outline focus:outline-gray-800 focus:outline-offset-2' type="password" id='password' name='password'/>
          </div>
          <button className="my-5 transition bg-blue-400 font-semibold py-3 px-3 hover:bg-blue-500">Login</button>
        </form>
        <span className='font-light'>Belum Terdaftar ? <Link className='font-normal' href="/daftar">Daftar &#x2192;</Link></span>
      </div>
    </main>
  )
}
