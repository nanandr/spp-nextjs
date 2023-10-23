"use client"
import Input from "@/components/Input";
import { useState } from "react";

export default function Create(props) {
    const [form, setForm] = useState({
        nama: '',
        nis: '',
        jk: 'LakiLaki',
        kelas: '',
        angkatan: '',
        hp: '',
        diskon: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: ['kelas', 'angkatan', 'diskon'].includes(name) ? parseInt(value) : value,
        }));
    };    
    
    
    const submit = (e) => {
        e.preventDefault();    
        props.submitHandler(form);
    }

    return (
        <form onSubmit={submit} className="m-3">
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nama">Nama Siswa</label>
                <Input
                    autoComplete='off' 
                    type="text" 
                    id='nama' 
                    name='nama' 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nis">NIS</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='nis' 
                    name='nis' 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
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
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="kelas">Kelas</label>
                <Input
                    autoComplete='off' 
                    type="text" 
                    id='kelas' 
                    name='kelas' 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="angkatan">Angkatan</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='angkatan' 
                    name='angkatan' 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='hp' 
                    name='hp' 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="diskon">Diskon</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='diskon' 
                    name='diskon' 
                    onChange={handleChange}
                    required
                />
            </div>
            <button disabled={props.loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (props.loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{props.loading ? "Loading..." : "Submit"}</button>
        </form>
    )
} 