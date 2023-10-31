"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, siswaFormat } from "../../../utils/format"

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([])
  const [currentDataSiswa, setCurrentDataSiswa] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const url = "/api/siswa/";

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(url))
      const formattedData = await siswaFormat(res.data.siswa)
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

  const getSelectedData = async (id) => {
    try {
      const res = await axios.get(getUrl(`${url}${id}`))
      setCurrentDataSiswa(res.data.siswa)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const editHandler = {
    form: "Edit Data Siswa",
    dataSiswa: currentDataSiswa,
    submitHandler: async (data) => {
      setLoading(true)
      await axios.put(getUrl(`${url}${data.id}`), data)
        .then(res => console.log(res))
        .catch(err => console.error(err))
        .finally(() => fetchData())
    } 
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
    fetchData()
  }, [])

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet/>
        <InputData title="Input Data Siswa" form="Form Tambah Data Siswa">
          <Create loading={loading} submitHandler={submitHandler}/>
        </InputData>
      </div>
      <Table title='Siswa' data={dataSiswa} loading={loading} error={error} getSelectedData={getSelectedData} editHandler={editHandler} deleteHandler={deleteHandler}/>
    </Index>
  )
}