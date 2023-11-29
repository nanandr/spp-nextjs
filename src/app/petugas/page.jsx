"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import axios from "axios"
import { deleteDialog, getNum, getUrl } from "../../../utils/format"
import InputData from "@/components/InputData"
import Create from "./create"
import TableFormat, { Button, Link, Td, Tr } from "@/components/TableFormat"
import PopUp from "@/components/PopUp"
import Pagination from "@/components/Pagination"
import { Delete, Edit } from "../../../public/svg"
import Search from "@/components/Search"

export default function Petugas() {
  const [dataPetugas, setDataPetugas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [view, setView] = useState(0)
  const [total, setTotal] = useState(0)
  const [showPopUp, setPopUp] = useState(false)
  const [search, setSearch] = useState('')
  const url = "/api/petugas/";

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/petugas?page=${page}&search=${search}`))
      setDataPetugas(res.data.petugas)
      setTotal(res.data.total)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true);
    await axios.post(getUrl('/api/auth/register'), data)
      .then(async (res) => console.log(res))
      .catch(err => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => fetchData())
  }

  const editHandler = async (form) => {
    setLoading(true)
    await axios.put(getUrl(`${url}${form.id}`), form)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData())
  }

  const deleteHandler = async (id) => {
    if (deleteDialog()) {
      setLoading(true)
      await axios.delete(getUrl(`${url}${id}`))
        .then(res => console.log(res))
        .catch(err => {
          console.error(err)
          setError(err.response.data.message)
        })
        .finally(() => fetchData())
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [page])

  return (
    <Index title='Petugas' placeholder='Cari Petugas (NIP, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      <div className="flex flex-row gap-2 justify-end flex-wrap">
        <Search placeholder='Cari Nama Petugas...' search={search} setSearch={setSearch} searchHandler={() => fetchData()} setPage={setPage}/>
        <InputData title="Input Data Akun Petugas" form="Form Tambah Akun Petugas">
          <Create loading={loading} submitHandler={submitHandler} />
        </InputData>
      </div>
      <TableFormat title='Akun Petugas' format={['No', 'NIP', 'Nama Petugas', 'Email', 'JK', 'Alamat', 'HP', 'Data Dibuat', 'Data Diubah']} loading={loading} error={error} data={dataPetugas}>
        {dataPetugas.map((petugas, index) => (
          <Tr>
            <Td>{getNum(page, index)}</Td>
            <Td><Link title={petugas.nip} /></Td>
            <Td><Link title={petugas.nama} /></Td>
            <Td><Link title={petugas.email} /></Td>
            <Td><Link title={petugas.jk} /></Td>
            <Td><Link title={petugas.alamat} /></Td>
            <Td><Link title={petugas.hp} /></Td>
            <Td><Link title={petugas.createdAt} /></Td>
            <Td><Link title={petugas.updatedAt} /></Td>
            <Td className='flex flex-row gap-2 justify-end'>
              <Button clickHandler={() => {
                setPopUp(true)
                setView(index)
              }} backgroundColor={'bg-orange-500'}><Edit /></Button>
              <Button clickHandler={() => deleteHandler(petugas.id)} backgroundColor={'bg-red-500'}><Delete /></Button>
            </Td>
          </Tr>
        ))
        }
      </TableFormat>
      {
        showPopUp &&
        <PopUp title="Edit Data Petugas" onClose={() => setPopUp(false)}>
          <Create data={dataPetugas[view]} submitHandler={(form) => editHandler(form)} loading={loading} />
        </PopUp>
      }
      <Pagination page={page} setPage={setPage} loading={loading} total={total} />
    </Index>
  )
}