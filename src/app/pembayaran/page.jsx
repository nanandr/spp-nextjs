"use client";

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios";

export default function Pembayaran() {
  const [dataPembayaran, setDataPembayaran] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    await axios.get(`http://${window.location.host}/api/pembayaran`)
    .then(res => setDataPembayaran(res.data.transaksi))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(`http://${window.location.host}/api/pembayaran`, data)
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
    <Index title='Pembayaran' placeholder='Cari Pembayaran (NIS, Nama, Tanggal)...'>
        <Table title='Pembayaran' data={dataPembayaran}/>
    </Index>
  )
}