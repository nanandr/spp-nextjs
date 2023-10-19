"use client"
import Input from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create(props) {
    const [loading, setLoading] = useState(false);
    const [nama, setNama] = useState('');
    const [nis, setNis] = useState(0);
    const [jk, setJk] = useState('');
    const [kelas, setKelas] = useState(0);
    const [angkatan, setAngkatan] = useState(0);
    const [hp, setHp] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const router = useRouter();

    const submit = (e) => {
        e.preventDefault();
        const data = {
            nama,
            nis,
            jk,
            kelas,
            angkatan,
            hp,
            diskon
        };

        props.submitHandler(data);
    }

    return (
        <form onSubmit={submit} className="m-3">
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nama">Nama Siswa</label>
                <Input
                    autoComplete='off' 
                    type="text" 
                    id='nama' 
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                    required />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nis">NIS</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='nis' 
                    onChange={(e) => setNis(e.target.value)}
                    value={nis}
                    required />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
                <select 
                    className="text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
                    id='jk'
                    onChange={(e) => setJk(e.target.value)}
                    value={jk}
                    required>
                    <option value="Lakilaki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="kelas">Kelas</label>
                <Input
                    autoComplete='off' 
                    type="text" 
                    id='kelas' 
                    onChange={(e) => setKelas(e.target.value)}
                    value={kelas}
                    required />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="angkatan">Angkatan</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='angkatan' 
                    onChange={(e) => setAngkatan(e.target.value)}
                    value={angkatan}
                    required />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='hp' 
                    onChange={(e) => setHp(e.target.value)}
                    value={hp}
                    required />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="diskon">Diskon</label>
                <Input
                    autoComplete='off' 
                    type="number" 
                    id='diskon' 
                    onChange={(e) => setDiskon(e.target.value)}
                    value={diskon}
                    required />
            </div>
            <button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
        </form>
    )
} 