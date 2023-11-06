"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios"
import { getUrl, petugasFormat } from "../../../utils/format"

export default function Petugas() {
  const [dataPetugas, setDataPetugas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl('/api/petugas'))
      const formattedData = await petugasFormat(res.data.petugas)
      setDataPetugas(formattedData)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl('/api/petugas'), data)
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
    <Index title='Petugas' placeholder='Cari Petugas (NIP, Nama)...'>
        <Table title='Petugas' data={dataPetugas} viewHandler={'/petugas/'} loading={loading} error={error}/>
    </Index>
  )
}