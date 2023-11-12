"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, kelasFormat, siswaFormat } from "../../../utils/format"
import Pagination from "@/components/Pagination"
import { useSearchParams } from "next/navigation"

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([])
  const [kelas, setKelas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [index, setIndex] = useState(0)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const searchParams = useSearchParams()
  const url = "/api/siswa/"

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=${page}`))
      const resKelas = await axios.get(getUrl('/api/kelas?take=0'))
      const formattedKelas = await kelasFormat(resKelas.data.kelas)
      setKelas(formattedKelas)
      setTotal(res.data.total)
      const formattedData = await siswaFormat(res.data.siswa, page, searchParams.get('tahun'))
      setDataSiswa(formattedData)
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
  }, [page, searchParams.get('tahun')])

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Akun Siswa" form="Form Tambah Akun Siswa">
          <Create loading={loading} submitHandler={submitHandler} kelas={kelas} />
        </InputData>
      </div>
      <Table title='Akun Siswa' data={dataSiswa} loading={loading} error={error} viewHandler={'/siswa/'} editHandler={editHandler} deleteHandler={deleteHandler} />
      <Pagination page={page} setPage={setPage} loading={loading} total={total} />
    </Index>
  )
}