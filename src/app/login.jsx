'use client';

import Image from 'next/image';
import logo from '../../assets/image/logo90x90.png';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { getUrl } from '../../utils/format';

export default function Login() {
  const [view, setView] = useState('Login');
  
  useEffect(() => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  }, []);

  return (
    <main className="flex justify-center bg-black bg-opacity-90 min-h-screen">
      <Form title={view} setView={setView} />
    </main>
  )
}

function Form(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nama: '',
    nip: '',
    alamat: '',
    jk: 'LakiLaki',
    hp: '',
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

  const signup = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios.post(getUrl('/api/auth/register'), form)
      .then(async (res) => {
        console.log(res);
        await signIn('credentials', {
          email: form.email,
          password: form.password
        });

        router.refresh();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.message);
      });
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh();
      router.push('dashboard');
    }
  }, [status]);

  return (
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
      <form className='flex flex-col mt-5' onSubmit={props.title == 'Login' ? login : signup} method="post">
        {
          props.title == 'Signup' &&
          <>
            <Input name="nama" type="text" handleChange={handleChange} />
            <Input name="nip" type="number" handleChange={handleChange} />
            <Input name="alamat" type="text" handleChange={handleChange} />
            <div className="my-3">
              <div className="flex flex-row justify-between mb-1">
                <label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
              </div>
              <select
                defaultValue={"LakiLaki"}
                className="text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
                id='jk'
                name='jk'
                value={form['jk']}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  jk: e.target.value
                }))}
                required
              >
                <option value="LakiLaki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <Input name="hp" type="number" handleChange={handleChange} />
          </>
        }
        <Input name="email" type="text" handleChange={handleChange} />
        <Input name="password" type="password" handleChange={handleChange}>
          {
            props.title == 'Login' &&
            <p className='text-gray-500 cursor-pointer'>Lupa Password?</p>
          }
        </Input>
        <button disabled={loading} type='submit' className={"my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : props.title}</button>
      </form>
      {
        props.title == 'Login' ?
          <span className='font-light'>Belum Terdaftar ? <button type='button' onClick={() => props.setView('Signup')} className='font-normal'>Daftar &#x2192;</button></span>
          :
          <span className='font-light'><button type='button' onClick={() => props.setView('Login')} className='font-normal'>&#8592; Kembali</button></span>
      }
    </div>
  )
}

function Input(props) {
  return (
    <div className="my-3">
      <div className="flex flex-row justify-between mb-1">
        <label className='block text-sm font-light mb-1' htmlFor={props.name}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</label>
        {
          props.children &&
          props.children
        }
      </div>
      <input onChange={props.handleChange} onWheel={(e) => e.target.blur()} autoComplete='off' className='text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2' type={props.type} id={props.name} name={props.name} />
    </div>
  )
}