"use client";

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import axios from "axios";
import { getUrl } from "../../../utils/getUrl";

export default function Laporan() {
  const [dataLaporan, setDataLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    await axios.get(getUrl('/api/laporan'))
    .then(res => setDataLaporan(res.data.laporan))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(getUrl('/api/laporan'), data)
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
        <Index title='Laporan' placeholder='Cari Laporan...'>
            <Table title='Laporan' data={dataLaporan} loading={loading} error={error} />
        </Index>
    )
}