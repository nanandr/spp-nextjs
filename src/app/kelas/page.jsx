"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { deleteDialog, getNum, getUrl } from "../../../utils/format"
import Pagination from "@/components/Pagination"
import TableFormat, { Button, Link, Td, Tr } from "@/components/TableFormat"
import { Delete, Edit } from "../../../public/svg"
import PopUp from "@/components/PopUp"

export default function Kelas() {
  const [dataKelas, setDataKelas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [view, setView] = useState(0)
  const [total, setTotal] = useState(0)
  const [showPopUp, setPopUp] = useState(false)


  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/kelas?page=${page}`))
      setDataKelas(res.data.kelas)
      setTotal(res.data.total)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl('/api/kelas'), data)
      .then(res => console.log(res))
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
      })
      .finally(() => fetchData())
  }

  const editHandler = async (form) => {
    setLoading(true)
    await axios.put(getUrl(`/api/kelas/${form.id}`), form)
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
      await axios.delete(getUrl(`/api/kelas/${id}`))
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
    <Index title='Kelas' placeholder='Cari Kelas...'>
      <div className="flex flex-row gap-2 justify-end">
        <InputData title="Input Data Kelas" form="Form Tambah Data Kelas">
          <Create loading={loading} submitHandler={submitHandler} />
        </InputData>
      </div>
      <TableFormat title='Kelas' format={['No', 'Nama Kelas', 'Data Dibuat', 'Data Diubah']} loading={loading} error={error} data={dataKelas}>
        {dataKelas.map((kelas, index) => (
          <Tr>
            <Td>{getNum(page, index)}</Td>
            <Td><Link title={kelas.namaKelas} href={`kelas/${kelas.id}`} /></Td>
            <Td><Link title={kelas.createdAt} /></Td>
            <Td><Link title={kelas.updatedAt} /></Td>
            <Td className='flex flex-row gap-2 justify-end'>
              <Button clickHandler={() => {
                setPopUp(true)
                setView(index)
              }} backgroundColor={'bg-orange-500'}><Edit /></Button>
              <Button clickHandler={() => deleteHandler(siswa.id)} backgroundColor={'bg-red-500'}><Delete /></Button>
            </Td>
          </Tr>
        ))
        }
      </TableFormat>
      {
        showPopUp &&
        <PopUp title="Edit Data Kelas" onClose={() => setPopUp(false)}>
          <Create data={dataKelas[view]} submitHandler={(form) => editHandler(form)} loading={loading} />
        </PopUp>
      }
      <Pagination page={page} setPage={setPage} loading={loading} total={total} />
    </Index>
  )
}