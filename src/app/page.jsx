'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/image/logo90x90.png';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from 'next-auth/react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const { data: session } = useSession();
  console.log('Client Session', session);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
        ...prevForm,
        [name]: value,
    }));
  };    

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(form);

    await axios.post(`http://${window.location.host}/api/auth/login`, form)
    .then(res => {
      // return router.push('/dashboard');
      console.log(res)
    })
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
      setLoading(false);
    });
  }

  return (
    <main className="flex justify-center bg-black bg-opacity-90 min-h-screen">
      <div className="text-gray-200 shadow rounded p-10 bg-zinc-800 h-fit my-auto">
        <div className="flex flex-row flex-wrap align-middle">
          <Image 
            src={logo} 
            alt="Logo SDQ Bina Mulya" 
            width={90}
            height={90}
          />
          <div className="flex flex-col align-middle p-2">
            <h3 className="text-white text-4xl font-bold">SDQ Bina Mulya</h3>
            <p className='text-gray-500'>Aplikasi SPP</p>
          </div>
        </div>
        <form className='flex flex-col mt-5' onSubmit={login} method="post">
          <div className="my-3">
            <label className='block text-sm font-light mb-1' htmlFor="email">E-Mail or Username</label>
            <input onChange={handleChange} autoComplete='off' className='text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2' type="text" id='email' name='email'/>
          </div>
          <div className="my-3">
            <div className="flex flex-row justify-between mb-1">
              <label className='block text-sm font-light' htmlFor="Password">Password</label>
              <p className='text-gray-500 cursor-pointer'>Lupa Password?</p>
            </div>
            <input onChange={handleChange} autoComplete='off' className='text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2' type="password" id='password' name='password'/>
          </div>
          <button disabled={loading} type='submit' className={"my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Login"}</button>
        </form>
        <span className='font-light'>Belum Terdaftar ? <Link className='font-normal' href="/daftar">Daftar &#x2192;</Link></span>
      </div>
    </main>
  )
}
