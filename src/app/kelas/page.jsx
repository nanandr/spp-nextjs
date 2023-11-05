"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, kelasFormat } from "../../../utils/format"

export default function Kelas() {
  const [dataKelas, setDataKelas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl('/api/kelas'))
      const formattedData = await kelasFormat(res.data.kelas)
      setDataKelas(formattedData)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl('/api/kelas'), data)
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
      setError(err.response.data.message)
    })
    .finally(() => fetchData())
  }

  const editHandler = {
    title: "Form Edit Data Kelas",
    indexHandler: (index) => setIndex(index),
    form: () => <Create loading={loading} data={dataKelas[index]} submitHandler={async (data) => {
      setLoading(true)
      await axios.put(getUrl(`/api/kelas/${data.id}`), data)
        .then(res => console.log(res))
        .catch(err => console.error(err))
        .finally(() => fetchData());
    }} />,
  }

  const deleteHandler = async (id) => {
    setLoading(true)
    await axios.delete(getUrl(`/api/kelas/${id}`))
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
    <Index title='Kelas' placeholder='Cari Kelas...'>
        <div className="flex flex-row gap-2 justify-end">
          <InputData title="Input Data Kelas" form="Form Tambah Data Kelas">
            <Create loading={loading} submitHandler={submitHandler}/>
          </InputData>
        </div>
        <Table title='Kelas' data={dataKelas} loading={loading} error={error} editHandler={editHandler} deleteHandler={deleteHandler}/>
    </Index>
  )
}