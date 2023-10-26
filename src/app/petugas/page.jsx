"use client";

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios";

export default function Petugas() {
  const [dataPetugas, setDataPetugas] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    await axios.get(`http://${window.location.host}/api/petugas`)
    .then(res => setDataPetugas(res.data.petugas))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(`http://${window.location.host}/api/petugas`, data)
    .then(res => console.log(res))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => fetchData());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Index title='Petugas' placeholder='Cari Petugas (NIP, Nama)...'>
        <Table title='Petugas' data={dataPetugas} loading={loading} error={error}/>
    </Index>
  )
}