"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, siswaFormat } from "../../../utils/format"
import Pagination from "@/components/Pagination"

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const url = "/api/siswa/";

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=${page}`));
      setTotal(res.data.total);
      const formattedData = await siswaFormat(res.data.siswa, page);
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
    await axios.post(getUrl(url), data)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData());
  }

  const editHandler = {
    title: "Edit Data Siswa",
    indexHandler: (index) => setIndex(index),
    form: () => <Create loading={loading} dataSiswa={dataSiswa[index]} submitHandler={async (data) => {
      setLoading(true)
      await axios.put(getUrl(`${url}${data.id}`), data)
        .then(res => console.log(res))
        .catch(err => console.error(err))
        .finally(() => fetchData());
    }} />,
  }

  const deleteHandler = async (id) => {
    setLoading(true);
    await axios.delete(getUrl(`${url}${id}`))
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData());
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Siswa" form="Form Tambah Data Siswa">
          <Create loading={loading} submitHandler={submitHandler} />
        </InputData>
      </div>
      <Table title='Siswa' data={dataSiswa} loading={loading} error={error} editHandler={editHandler} deleteHandler={deleteHandler} />
      {/* DONT FORGET TO CHANGE TOTAL TO VALUE FROM API */}
      <Pagination page={page} setPage={setPage} loading={loading} total={total}/> 
    </Index>
  )
}