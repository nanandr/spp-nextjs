"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { getKelas, getNum, getUrl, isEmpty, pembayaranFormat } from "../../../utils/format"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Create from "./create"
import { Add, Info, Search as SearchIcon } from "../../../public/svg"
import TableFormat, { Button, Link, Td, Tr } from "@/components/TableFormat"
import { useSession } from "next-auth/react"
import { useSelector } from "react-redux"
import { getId } from "@/redux/features/tahunAjarSlice"
import InputData from "@/components/InputData"

export default function Pembayaran() {
  const { data: session } = useSession()
  const [dataPembayaran, setDataPembayaran] = useState([])
  const [dataSpp, setDataSpp] = useState([])
  const [dataSiswa, setDataSiswa] = useState({})
  const [status, setStatus] = useState([])
  // MUST BE FIXED ON API NULL SEARCHPARAM
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showPopUp, setPopUp] = useState(false)
  const bulan = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']
  const tahunId = useSelector(getId)


  // const fetchData = async () => {
  //   try {
  //   } catch (err) {
  //     console.error(err)
  //     setError(err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const getSiswa = async (search) => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=all&search=${search}&tahun=${tahunId}`))
      const siswa = res.data.siswa[0] || {}

      if (!isEmpty(siswa)) {
        setDataSiswa(siswa)
        const resPembayaran = await axios.get(getUrl(`/api/pembayaran?siswa=${siswa.id}&tahun=${tahunId}`))
        setDataPembayaran(resPembayaran.data.transaksi)

        const resSpp = await axios.get(getUrl(`/api/spp?tahunAjar=${siswa.kelas[0].tahunId}`))
        setDataSpp(resSpp.data.spp[0] || {})
        setLoading(true)
      } else {
        setDataSiswa(siswa)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
      // fetchData()
    }
  }

  const searchHandler = () => {
    if(search.trim() !== '') {
      getSiswa(search)
    }   
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl('/api/pembayaran'), data)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => getSiswa(search))
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
    getSiswa(search)
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="text-white p-2 rounded-lg hover:bg-zinc-800 hover:bg-opacity-50">
                  <SearchIcon className="w-7 h-7" />
                </button>
              </div>
            </form>
          </div>
          {Object.keys(dataSiswa).length > 0 && !(getKelas(dataSiswa.kelas, tahunId) == undefined) && <>
            <div className="w-full bg-zinc-700 p-3 md:p-4 rounded-lg flex flex-col">
              <h2 className="font-semibold">Data Siswa</h2>
              <div className="w-full flex flex-row py-2">
                <table className="w-full">
                  <tbody className="font-light w-fit">
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">NIS</th>
                      <td>: {dataSiswa.nis}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">NISN</th>
                      <td>: {dataSiswa.nisn}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">Nama Siswa</th>
                      <td>: {dataSiswa.nama}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">Kelas</th>
                      <td>: {getKelas(dataSiswa.kelas, tahunId)?.namaKelas}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">No Hp</th>
                      <td>: {dataSiswa.hp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-zinc-300 text-left py-1 sm:max-w-[20px]">Alamat</th>
                      <td>: {dataSiswa.alamat}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full bg-zinc-700 p-2 md:p-4 rounded-lg flex flex-col">
              <div className="flex flex-row-reverse">
                <InputData title="Bayar SPP" form="From Pembayaran SPP">
                  <Create loading={loading} submitHandler={submitHandler} siswa={dataSiswa} data={dataPembayaran}/>
                </InputData>
              </div>
              <TableFormat title='Tagihan' format={['No', 'Nama Petugas', 'Jenis SPP', 'Total Tagihan', 'Bulan', 'Status', 'Detail']} loading={loading} error={error} data={bulan}>
                {bulan.map((bulan, i) => {
                  const transaksi = dataPembayaran.find(item => item.bulan === bulan);

                  return (
                    <Tr className={transaksi ? '' : 'opacity-60 cursor-default'} key={i}>
                      <Td>{getNum(1, i)}</Td>
                      <Td><Link title={transaksi ? transaksi.namaPetugas : '-'} /></Td>
                      <Td><Link title={`SPP Bulan ${bulan}`} /></Td>
                      <Td><Link title={dataSpp.spp} /></Td>
                      <Td><Link title={bulan} /></Td>
                      <Td className={`${transaksi ? 'bg-green-700' : 'bg-red-700'} text-center w-fit`}>
                        {transaksi ? <span>Lunas</span> : <span>Belum Lunas</span>}
                      </Td>
                      <Td className='flex flex-row gap-2'>
                        <Button clickHandler={() => alert('Belum di handle')}>
                          <Info />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </TableFormat>
            </div>
          </>}
        </main>
      </div>
    </div>
  )
}