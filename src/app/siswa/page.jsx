"use client";

import { useCallback, useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet";
import InputData from "@/components/InputData";
import Create from "./create";
import axios from "axios";

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    await axios.get(`http://${window.location.host}/api/siswa`)
    .then(res => setDataSiswa(res.data))
    .catch(err => {
      console.error(err);
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
  }

  const submitHandler = useCallback(
    async (data) => {
      setLoading(true);
      await axios.post(`http://${window.location.host}/api/siswa`, data)
      .then(res => console.log(res))
      .catch(error => {
        console.error(error);
        setError(error.response.data.message);
      })
      .finally(() => setLoading(false));
    }, []);

  useEffect(() => {
    fetchData();
  }, [submitHandler]);

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama, Tanggal)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet/>
        <InputData>
          <Create loading={loading} submitHandler={submitHandler}/>
        </InputData>
      </div>
      <Table title='Siswa' data={dataSiswa} loading={loading} error={error} />
    </Index>
  )
}