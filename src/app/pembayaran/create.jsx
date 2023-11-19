"use client"
import Input from "@/components/Input"
import { getId } from "@/redux/features/tahunAjarSlice"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Create({ data, siswa, submitHandler, loading }) {
    const tahunAjarId = useSelector(getId)
    const dataSiswa = siswa ?? ''

    console.log(dataSiswa)
    console.log(data)
    console.log(tahunAjarId)

    // const currentData = data ?? ''
    // const dataKelas = kelas ?? ''
    // const [form, setForm] = useState({
    //     id: currentData.id ?? '',
    //     siswaId: dataSiswa.Id ?? '',
    //     userId: currentData.userId ?? '',
    //     sppId: currentData.sppId ?? '',
    //     tanggal: currentData.tanggal ?? '',
    //     totalBayar: currentData.totalBayar ?? '',
    //     bulan: currentData.bulan ?? '',
    //     tahunAjar: tahunAjarId
    // })

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setForm(prevForm => ({
    //         ...prevForm,
    //         [name]: ['totalBayar','siswaId'].includes(name) ? parseInt(value) : value,
    //     }))
    // }

    // const submit = (e) => {
    //     e.preventDefault()
    //     submitHandler(form)
    // }

    // return (
    //     <form onSubmit={submit} className="m-3">
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="nama">Nama Siswa</label>
    //             <Input
    //                 type="text"
    //                 id='nama'
    //                 name='nama'
    //                 value={form['nama']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="nis">NIS</label>
    //             <Input
    //                 type="number"
    //                 id='nis'
    //                 name='nis'
    //                 value={form['nis']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="nisn">NISN</label>
    //             <Input
    //                 type="number"
    //                 id='nisn'
    //                 name='nisn'
    //                 value={form['nisn']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="alamat">Alamat</label>
    //             <Input
    //                 type="text"
    //                 id='alamat'
    //                 name='alamat'
    //                 value={form['alamat']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
    //             <select
    //                 defaultValue={"LakiLaki"}
    //                 className="text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
    //                 id='jk'
    //                 name='jk'
    //                 value={form['jk']}
    //                 onChange={(e) => setForm(prev => ({
    //                     ...prev,
    //                     jk: e.target.value
    //                 }))}
    //             >
    //                 <option value="LakiLaki">Laki-laki</option>
    //                 <option value="Perempuan">Perempuan</option>
    //             </select>
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="kelas">Kelas</label>
    //             <select
    //                 className="text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
    //                 id='kelas'
    //                 name='kelas'
    //                 value={form['kelas']?.kelasId}
    //                 onChange={(e) => setForm(prev => ({
    //                     ...prev,
    //                     kelas: parseInt(e.target.value)
    //                 }))}
    //             >
    //                 {dataKelas.length > 0 ?
    //                     <>
    //                         {dataKelas.map((row, index) => (
    //                             <>
    //                                 <option key={index} value={row.id}>{row.Nama}</option>
    //                             </>
    //                         ))}
    //                     </>
    //                     :
    //                     <option value="" disabled>Data Kelas Tidak Tersedia</option>
    //                 }
    //             </select>
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="angkatan">Angkatan</label>
    //             <Input
    //                 type="number"
    //                 id='angkatan'
    //                 name='angkatan'
    //                 value={form['angkatan']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
    //             <Input
    //                 type="number"
    //                 id='hp'
    //                 name='hp'
    //                 value={form['hp']}
    //                 onChange={handleChange}
    //             />
    //         </div>
    //         {/* <div className="my-3">
    //             <label className='block text-sm font-light mb-1' htmlFor="diskon">Diskon</label>
    //             <Input 
    //                 type="number" 
    //                 id='diskon' 
    //                 name='diskon' 
    //                 value={form['diskon']}
    //                 onChange={handleChange}
    //             />
    //         </div> */}
    //         <button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
    //     </form>
    // )
} 