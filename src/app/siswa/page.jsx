"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import UploadSheet from "@/components/UploadSheet"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, kelasFormat, getNum, getKelas, deleteDialog } from "../../../utils/format"
import Pagination from "@/components/Pagination"
import TableFormat, { Td, Tr, Link, Button } from "@/components/TableFormat"
import { useSelector } from "react-redux"
import { getId } from "@/redux/features/tahunAjarSlice"
import { Delete, Edit } from "../../../public/svg"

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([])
  const [kelas, setKelas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [index, setIndex] = useState(0)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const url = "/api/siswa/"

  const tahunId = useSelector(getId)

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=${page}`))
      const resKelas = await axios.get(getUrl('/api/kelas?page=all'))
      const formattedKelas = await kelasFormat(resKelas.data.kelas)
      setDataSiswa(res.data.siswa)
      setKelas(formattedKelas)
      setTotal(res.data.total)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl(url), data)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData())
  }

  const editHandler = {
    title: "Edit Data Siswa",
    indexHandler: (index) => setIndex(index),
    form: () => <Create loading={loading} dataSiswa={dataSiswa[index]} kelas={kelas} submitHandler={async (data) => {
      setLoading(true)
      await axios.put(getUrl(`${url}${data.id}`), data)
        .then(res => console.log('Success'))
        .catch(err => console.error(err))
        .finally(() => fetchData())
    }} />,
  }

  const deleteHandler = async (id) => {
    if(!deleteDialog()) {
      return;
    }

    setLoading(true)
    await axios.delete(getUrl(`${url}${id}`))
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData())
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [page])

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Akun Siswa" form="Form Tambah Akun Siswa">
          <Create loading={loading} submitHandler={submitHandler} kelas={kelas} />
        </InputData>
      </div>
      <TableFormat title='Akun Siswa' format={['No', 'Nama Siswa', 'Kelas', 'NIS', 'NISN', 'JK', 'Alamat', 'HP', 'Data Dibuat', 'Data Diubah']} loading={loading} error={error}>
        {
          dataSiswa.map((siswa, index) => (
            <Tr>
              <Td>{getNum(page, index)}</Td>
              <Td><Link title={siswa.nama}/></Td>
              <Td><Link title={getKelas(siswa.kelas, tahunId)?.namaKelas}/></Td>
              <Td><Link title={siswa.nis}/></Td>
              <Td><Link title={siswa.nisn}/></Td>
              <Td><Link title={siswa.jk}/></Td>
              <Td><Link title={siswa.alamat}/></Td>
              <Td><Link title={siswa.hp}/></Td>
              <Td><Link title={siswa.createdAt}/></Td>
              <Td><Link title={siswa.updatedAt}/></Td>
              <Td className='flex flex-row flex-wrap gap-2'>
                <Button backgroundColor={'bg-orange-500'}><Edit/></Button>
                <Button clickHandler={() => deleteHandler(siswa.id)} backgroundColor={'bg-red-500'}><Delete/></Button>
              </Td>
            </Tr>
          ))
        }
      </TableFormat>
      <Pagination page={page} setPage={setPage} loading={loading} total={total} />
    </Index>
  )
}