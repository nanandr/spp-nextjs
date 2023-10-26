"use client";

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios";

export default function Kelas() {
  const [dataKelas, setDataKelas] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    await axios.get(`http://${window.location.host}/api/kelas`)
    .then(res => setDataKelas(res.data.kelas))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(`http://${window.location.host}/api/kelas`, data)
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
    <Index title='Kelas' placeholder='Cari Kelas...'>
        <Table title='Kelas' data={dataKelas} loading={loading} error={error}/>
    </Index>
  )
}