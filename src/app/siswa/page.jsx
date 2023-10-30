"use client";

import { useEffect, useState } from "react";
import Index from "../index";
import Table from "@/components/Table";
import UploadSheet from "@/components/UploadSheet";
import InputData from "@/components/InputData";
import Create from "./create";
import axios from "axios";
import { getUrl } from "../../../utils/getUrl";
import { siswaFormat, dateTimeFormat } from "../../../utils/format";

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl('/api/siswa'));
      const formattedData = await siswaFormat(res.data.siswa);
      setDataSiswa(formattedData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(getUrl('/api/siswa'), data)
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
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama, Tanggal)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData>
          <Create loading={loading} submitHandler={submitHandler} />
        </InputData>
      </div>
      <Table title='Siswa' data={dataSiswa} loading={loading} error={error} />
    </Index>
  )
}