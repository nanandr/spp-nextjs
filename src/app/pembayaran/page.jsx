"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { getNum, getUrl, pembayaranFormat, siswaFormat } from "../../../utils/format"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Add, Delete, Edit, Search as SearchIcon } from "../../../public/svg"
import TableFormat, { Button, Link, Td, Tr } from "@/components/TableFormat"
import { useSession } from "next-auth/react"
import { useSelector } from "react-redux"
import { getId } from "@/redux/features/tahunAjarSlice"

export default function Pembayaran() {
  const { data: session } = useSession()
  const [dataPembayaran, setDataPembayaran] = useState([])
  const [dataSpp, setDataSpp] = useState([])
  const [dataSiswa, setDataSiswa] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const bulan = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']
  const tahunId = useSelector(getId)


  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl('/api/pembayaran'))
      const formattedData = await pembayaranFormat(res.data.transaksi)
      setDataPembayaran(formattedData)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getSiswa = async (search) => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=all&search=${search}`))
      const formattedSiswa = await siswaFormat(res.data.siswa)
      setDataSiswa(formattedSiswa)
      const resSpp = await axios.get(getUrl(`/api/spp?tahunAjar=${tahunId}`))
      setDataSpp(resSpp.data.spp)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
      fetchData()
    }
  }

  const searchHandler = () => {
    getSiswa(search)
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl('/api/pembayaran'), data)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData())
  }

  const editHandler = {
    // form: "Edit Data Siswa",
    // submitHandler: async (data) => {
    //   setLoading(true)
    //   await axios.put(getUrl(`api/siswa/${data.id}`), data)
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err))
    //     .finally(() => fetchData())
    // } 
  }

  const deleteHandler = async (id) => {
    // setLoading(true)
    // await axios.delete(getUrl(`/api/siswa/${id}`))
    // .then(res => console.log(res))
    // .catch(err => {
    //   console.error(err)
    //   setError(err.response.data.message)
    // })
    // .finally(() => fetchData())
  }

  useEffect(() => {
    fetchData()
    // setDataSiswa([
    //   {
    //     "Alamat": "Jl. Panembakan No 234",
    //     "Angkatan": 48,
    //     "Data dibuat": "16 Nov 2023, 00:04",
    //     "Data diubah": null,
    //     "Hp": "081572071823",
    //     "JK": "LakiLaki",
    //     "Kelas": "",
    //     "NIS": "211115744",
    //     "NISN": "0061534825",
    //     "Nama": "Rafi Ikhwan Purnama",
    //     "No": 1,
    //     "id": 2
    //   }
    // ])
  }, [])

  return (
    <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
      <Sidebar active='Pembayaran' />
      <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
        <Header title='Pembayaran' />
        <main className="w-full sm:max-w-[calc(100vw-365px)] max-h-fit flex flex-col gap-5">
          <div className="w-full bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col">
            <h2 className="font-semibold mx-1">Entri Pembayaran</h2>
            <form className="w-full flex flex-col justify-between p-1 rounded-lg bg-zinc-700" action={searchHandler} method="get">
              <label className="whitespace-nowrap py-2" htmlFor="search">NIS/NISN Siswa</label>
              <div className="w-full flex flex-row">
                <input
                  autoComplete="off"
                  className="w-full text-sm transition-all bg-zinc-700 appearance-none border border-zinc-600 rounded py-3 px-3 mr-2 text-gray-300 leading-tight focus:outline-none focus:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
                  type="search" placeholder='Cari Akun Siswa Dengan NIS/NISN'
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="text-white p-2 rounded-lg hover:bg-zinc-800 hover:bg-opacity-50">
                  <SearchIcon className="w-7 h-7" />
                </button>
              </div>
            </form>
          </div>
          {dataSiswa.length > 0 ? <>
            <div className="w-full bg-zinc-700 p-2 md:p-4 rounded-lg flex flex-col">
              <h2 className="font-semibold">Data Siswa</h2>
              <div className="w-full flex flex-row py-2">
                <table className="w-full">
                  {dataSiswa.map((siswa, index) => (
                    <tbody key={index} className="font-light w-fit">
                      <tr>
                        <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">NIS</th>
                        <td>: {siswa.NIS}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">NISN</th>
                        <td>: {siswa.NISN}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">Nama Siswa</th>
                        <td>: {siswa.Nama}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">No Hp</th>
                        <td>: {siswa.Hp}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">Alamat</th>
                        <td>: {siswa.Alamat}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
            <div className="w-full bg-zinc-700 p-2 md:p-4 rounded-lg flex flex-col">
              <TableFormat title='Data Tagihan' format={['No', 'Nama Petugas', 'Jenis SPP', 'Total Tagihan', 'Bulan', 'Status']} loading={loading} error={error} data={dataSiswa}>
                {bulan.map((bulan, i) => (
                  dataSiswa.map((siswa) => (
                    <Tr>
                      <Td>{getNum(1, i)}</Td>
                      <Td><Link title={session ? session.user.nama : ''} /></Td>
                      <Td><Link title={`SPP Bulan ${bulan}`} /></Td>
                      {dataSpp.map((spp, index) => (
                        <Td><Link title={spp.spp} /></Td>
                      ))}
                      <Td><Link title={bulan} /></Td>
                      <Td><Link title={siswa.updatedAt} /></Td>
                      <Td className='flex flex-row gap-2 justify-end'>
                        <Button clickHandler={() => deleteHandler(siswa.id)} backgroundColor={'bg-green-700'}><Add /></Button>
                      </Td>
                    </Tr>
                  ))
                ))
                }
              </TableFormat>
            </div>
          </> : <></>}
        </main>
      </div>
    </div>
  )
}