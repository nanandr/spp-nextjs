"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios"
import { getUrl, pembayaranFormat } from "../../../utils/format"

export default function Pembayaran() {
  const [dataPembayaran, setDataPembayaran] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
  }, [])

  return (
    <Index title='Pembayaran' placeholder='Cari Pembayaran (NIS, Nama, Tanggal)...'>
        <Table title='Pembayaran' data={dataPembayaran} loading={loading} error={error} editHandler={editHandler} deleteHandler={deleteHandler}/>
    </Index>
  )
}