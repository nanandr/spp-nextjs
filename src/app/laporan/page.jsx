"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import axios from "axios"
import { getNum, getUrl, bulan } from "../../../utils/format"
import TableFormat, { Button, Link, Td, Tr } from "@/components/TableFormat"
import { useSelector } from "react-redux"
import { getId } from "@/redux/features/tahunAjarSlice"

export default function Laporan() {
  const [dataLaporan, setDataLaporan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tahun, setTahun] = useState('')
  const tahunId = useSelector(getId)

  // const fetchData = async () => {
  //   await axios.get(getUrl(`/api/pembayaran`))
  //     .then(res => setDataLaporan(res.data.transaksi))
  //     .catch(err => {
  //       console.error(err)
  //       setError(err.response.data.message)
  //     })
  //     .finally(() => setLoading(false))
  // }

  const rangeHandler = async (range, bulan = '') => {
    setLoading(true)
    await axios.get(getUrl(`/api/pembayaran?tahun=${tahunId ? tahunId : 3}&range=${range}&bulan=${bulan}`))
      .then(res => {
        setDataLaporan(res.data.transaksi)
        setTahun(res.data.tahun)
      })
      .catch(err => setError(err.response.data.message))
      .finally(() => setLoading(false))
  }

  // const submitHandler = async (data) => {
  //   setLoading(true)
  //   await axios.post(getUrl('/api/laporan'), data)
  //     .then(res => console.log(res))
  //     .catch(err => {
  //       console.error(err)
  //       setError(err.response.data.message)
  //     })
  //     .finally(() => fetchData())
  // }

  useEffect(() => {
    rangeHandler('today')
  }, [])

  return (
    <Index title='Laporan'>
      <div className="flex w-full gap-x-3">
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('today')}>Today</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('1-month')}>1 Month</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('6-month')}>6 Month</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('semester-1')}>Semester 1</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('semester-2')}>Semester 2</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('1-year')}>1 Year</Button>
        <Button custom={'w-fit h-fit p-3'} backgroundColor={'bg-zinc-800'} clickHandler={() => rangeHandler('full-year')}>Full Year</Button>
      </div>
      {dataLaporan?.length > 0 ? <div className="bg-white text-black font-serif p-2 text-center">
        <h1 className="text-2xl font-bold">Laporan Pembayaran SPP {tahun}</h1>
        <TableFormat format={['No', 'Nama Petugas', 'Nama Siswa', 'Kelas', 'Bulan', 'Nominal SPP', 'Nominal Bayar', 'Tanggal Transaksi']} loading={loading} error={error} data={dataLaporan}>
          {dataLaporan.map((transaksi, i) => {
            return (
              <Tr key={i}>
                <Td>{getNum(1, i)}</Td>
                <Td><Link title={transaksi.namaPetugas} /></Td>
                <Td><Link title={transaksi.namaSiswa} /></Td>
                <Td><Link title={transaksi.kelas[0].kelas} /></Td>
                <Td><Link title={transaksi.bulan} /></Td>
                <Td><Link title={transaksi.spp.spp} /></Td>
                <Td><Link title={transaksi.spp.spp} /></Td>
                <Td><Link title={transaksi.tanggalBayar} /></Td>
              </Tr>
            );
          })}
        </TableFormat>
      </div> : <span className="text-center my-2">Data Tidak Tersedia</span>}
    </Index>
  )
}