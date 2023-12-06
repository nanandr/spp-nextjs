"use client"

import Index from "../../index"
import InputData from "@/components/InputData"
import UploadSheet from "@/components/UploadSheet"
import Create from "./create"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { getNum, getUrl, ttl } from "../../../../utils/format"
import { useSearchParams } from "next/navigation"
import TableFormat, { Tr, Td, Link } from "@/components/TableFormat"

export default function Kelas({ params }) {
  const [kelas, setKelas] = useState({})
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const searchParams = useSearchParams()

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/kelas/${params.id}/siswa?tahun=${searchParams.get('tahun')}`))
      setKelas(res.data.kelas)
      setData(res.data.kelasSiswa)
      console.log(res.data)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [page, searchParams.get('tahun')])

  return (
    <Index title={`Kelas > ${kelas.namaKelas || ''}`} placeholder='Cari Siswa...'>
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Siswa" form={`Form Tambah Data Siswa Kelas ${kelas.namaKelas || ''}`}>
          <Create />
        </InputData>
      </div>
      <TableFormat title={`Kelas ${kelas.namaKelas || ''}`} format={['No', 'Nama Siswa', 'NIS', 'NISN', 'TTL', 'JK', 'Alamat', 'HP', 'Data Dibuat', 'Data Diubah']} loading={loading} data={data}>
        {data.map((kelas, index) => (
          <Tr>
            <Td>{getNum(page, index)}</Td>
            <Td><Link title={kelas.siswa.nama} /></Td>
            <Td><Link title={kelas.siswa.nis} /></Td>
            <Td><Link title={kelas.siswa.nisn} /></Td>
            <Td><Link title={ttl(kelas.siswa.tempatLahir, kelas.siswa.tanggalLahir)} /></Td>
            <Td><Link title={kelas.siswa.jk} /></Td>
            <Td><Link title={kelas.siswa.alamat} /></Td>
            <Td><Link title={kelas.siswa.hp} /></Td>
            <Td><Link title={kelas.siswa.createdAt} /></Td>
            <Td><Link title={kelas.siswa.updatedAt} /></Td>
          </Tr>
        ))}
      </TableFormat>
    </Index>
  )
}