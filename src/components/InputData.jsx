"use client"
import { useState } from "react";
import { Add } from "../../public/svg";
import { useRouter } from "next/navigation";
import PopUp from "./PopUp";

export default function InputData(props) {
    const [loading, setLoading] = useState(false);
    const [showPopUp, setPopUp] = useState(false);
    const [nama, setNama] = useState('');
    const [nis, setNis] = useState(0);
    const [jk, setJk] = useState('');
    const [kelas, setKelas] = useState(0);
    const [angkatan, setAngkatan] = useState(0);
    const [hp, setHp] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const router = useRouter()
    const inputClasses = `text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2`

    const handlePopUp = () => {
        setPopUp(false);
    }

    return (
        <>
            <button onClick={(e)=>setPopUp(true)} className="bg-zinc-800 px-5 py-2 hover:cursor-pointer rounded-lg flex w-fit hover:bg-zinc-900 transition duration-200 text-white flex-row align-middle">
                <Add/>
                Input Data Siswa
            </button>
            {
                showPopUp &&
                <PopUp title="Form Tambah Data Siswa" onClose={handlePopUp}>
                    <form onSubmit={props.submitHandler} className="m-3">
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="nama">Nama Siswa</label>
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="text" 
                            id='nama' 
                            onChange={(e) => setNama(e.target.value)}
                            value={nama}
                            required />
                    </div>
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="nis">NIS</label>
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="number" 
                            id='nis' 
                            onChange={(e) => setNis(e.target.value)}
                            value={nis}
                            required />
                    </div>
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
                        <select 
                            className={inputClasses} 
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
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="text" 
                            id='kelas' 
                            onChange={(e) => setKelas(e.target.value)}
                            value={kelas}
                            required />
                    </div>
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="angkatan">Angkatan</label>
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="number" 
                            id='angkatan' 
                            onChange={(e) => setAngkatan(e.target.value)}
                            value={angkatan}
                            required />
                    </div>
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="number" 
                            id='hp' 
                            onChange={(e) => setHp(e.target.value)}
                            value={hp}
                            required />
                    </div>
                    <div className="my-3">
                        <label className='block text-sm font-light mb-1' htmlFor="diskon">Diskon</label>
                        <input
                            autoComplete='off' 
                            className={inputClasses} 
                            type="number" 
                            id='diskon' 
                            onChange={(e) => setDiskon(e.target.value)}
                            value={diskon}
                            required />
                    </div>
                    <button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
                </form>
                </PopUp>
            }
        </>
    )
}