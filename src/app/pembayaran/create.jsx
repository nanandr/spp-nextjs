"use client"
import Input from "@/components/Input"
import { useState } from "react"
import { useSession } from 'next-auth/react'

export default function Create({ data, siswa, spp, submitHandler, loading }) {
    const { data: session } = useSession()

    console.log(siswa)
    console.log(data)
    console.log(spp)
    
    const [totalBulan, setTotalBulan] = useState(1)

    const [form, setForm] = useState({
        id: '',
        siswaId: siswa.id,
        userId: '',
        sppId: '',
        tanggal: '',
        totalBulan: totalBulan,
        totalBayar: totalBulan * spp.spp,
        bulan: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
            totalBayar: name === 'totalBulan' ? value * spp.spp : prevForm.totalBayar,
        }))
        setTotalBulan(value)
    }

    const submit = (e) => {
        e.preventDefault()
        submitHandler(form)
    }

    return (
        <form onSubmit={submit} className="m-3">
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nama_siswa">Nama Siswa</label>
                <Input
                    type="text"
                    id='nama_siswa'
                    name='nama_siswa'
                    disabled
                    value={siswa.nama}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="nama_petugas">Nama Petugas</label>
                <Input
                    type="text"
                    id='nama_petugas'
                    name='nama_petugas'
                    disabled
                    value={session ? session.user.nama : ''}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="totalBulan">Jumlah Bulan Bayar</label>
                <Input
                    type="number"
                    id='totalBulan'
                    name='totalBulan'
                    placeholder="Masukkan Jumlah Bulan"
                    value={totalBulan}
                    onChange={handleChange}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="totalBayar">Jumlah Bayar</label>
                <Input
                    type="number"
                    id='totalBayar'
                    name='totalBayar'
                    placeholder="Masukkan Jumlah Bulan"
                    value={form['totalBayar']}
                    disabled
                />
            </div>
            {/* <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="alamat">Alamat</label>
                <Input
                    type="text"
                    id='alamat'
                    name='alamat'
                    value={form['alamat']}
                    onChange={handleChange}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="angkatan">Angkatan</label>
                <Input
                    type="number"
                    id='angkatan'
                    name='angkatan'
                    value={form['angkatan']}
                    onChange={handleChange}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
                <Input
                    type="number"
                    id='hp'
                    name='hp'
                    value={form['hp']}
                    onChange={handleChange}
                />
            </div> */}
            {/* <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="diskon">Diskon</label>
                <Input 
                    type="number" 
                    id='diskon' 
                    name='diskon' 
                    value={form['diskon']}
                    onChange={handleChange}
                />
            </div> */}
            <button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
        </form>
    )
} 