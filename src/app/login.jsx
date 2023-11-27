'use client';

import Image from 'next/image';
import logo from '../../assets/image/logo90x90.png';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import Input from '@/components/Input';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();
  const { status } = useSession();

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

    try {
      const response = await signIn('credentials', {
        email: form.email,
        password: form.password
      });

      if (!response || response.ok !== true) {
        setLoading(false);
        setError("Invalid Credentials");
      }
    }
    catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh();
      router.push('dashboard');
    }
  }, [status]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  }, []);

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
            <label className='block text-sm font-light mb-1' htmlFor="email">Email</label>
            <Input
              type="text"
              id='email'
              name='email'
              value={form['email']}
              onChange={handleChange}
            />
          </div>
          <div className="my-3">
            <p className='text-gray-500 cursor-pointer float-right'>Lupa Password?</p>
            <label className='block text-sm font-light mb-1' htmlFor="password">Password</label>
            <Input
              type="password"
              id='password'
              name='password'
              value={form['password']}
              onChange={handleChange}
            />
          </div>
          <button disabled={loading} type='submit' className={"my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : 'Login'}</button>
        </form>
      </div>
    </main>
  )
}