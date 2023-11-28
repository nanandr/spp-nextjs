"use client"

import { useEffect, useState } from "react"
import Index from "../index"
import UploadSheet from "@/components/UploadSheet"
import InputData from "@/components/InputData"
import Create from "./create"
import axios from "axios"
import { getUrl, kelasFormat, getNum, getKelas, deleteDialog, ttl } from "../../../utils/format"
import Pagination from "@/components/Pagination"
import TableFormat, { Td, Tr, Link, Button } from "@/components/TableFormat"
import { useDispatch, useSelector } from "react-redux"
import { getId } from "@/redux/features/tahunAjarSlice"
import { Delete, Edit } from "../../../public/svg"
import PopUp from "@/components/PopUp"
import { closeEPopUp, openEPopUp, selectEPopUpStat } from "@/redux/features/editInputPopUpSlice"
import { openNotif, closeNotif, notificationVisiblility } from "@/redux/features/notificationSlice"
import Alert from "@/components/Alert"

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([])
  const [kelas, setKelas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [notifColor, setNotifColor] = useState('')
  const [page, setPage] = useState(1)
  const [view, setView] = useState(0)
  const [total, setTotal] = useState(0)
  const url = "/api/siswa/"
  const dispatch = useDispatch()
  const showEPopUp = useSelector(selectEPopUpStat)
  const isNotif = useSelector(notificationVisiblility)

  const tahunId = useSelector(getId)

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/siswa?page=${page}`))
      const resKelas = await axios.get(getUrl('/api/kelas?page=all'))
      const formattedKelas = await kelasFormat(resKelas.data.kelas)
      setDataSiswa(res.data.siswa)
      setKelas(formattedKelas)
      setTotal(res.data.total)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setMessage(err.message)
      setNotifColor('red')
      dispatch(openNotif())
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (data) => {
    setLoading(true)
    await axios.post(getUrl(url), data)
      .then(res => {
        setMessage(res.data.message)
        setNotifColor('green')
      })
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
        setMessage(err.response.data.message)
        setNotifColor('red')
      })
      .finally(() => {
        fetchData()
        dispatch(openNotif())
      })
  }

  const editHandler = async (form) => {
    setLoading(true)
    await axios.put(getUrl(`${url}${form.id}`), form)
      .then(res => {
        setMessage(res.data.message)
        setNotifColor('yellow')
      })
      .catch(err => {
        console.error(err)
        setError(err.response.data.message)
        setMessage(err.response.data.message)
        setNotifColor('red')
      })
      .finally(() => {
        fetchData()
        dispatch(openNotif())
      })
  }

  const deleteHandler = async (id) => {
    if (deleteDialog()) {
      setLoading(true)
      await axios.delete(getUrl(`${url}${id}`))
        .then(res => {
          setMessage(res.data.message)
          setNotifColor('red')
        })
        .catch(err => {
          console.error(err)
          setError(err.response.data.message)
          setMessage(err.response.data.message)
        })
        .finally(() => {
          fetchData()
          dispatch(openNotif())
        })
    }
  }

  const notifToggle = () => {
    if (isNotif) {
      dispatch(closeNotif())
    } else {
      dispatch(openNotif())
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
    dispatch(closeNotif())
  }, [page])

  return (
    <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama)...'>
      {/* search onsubmit={searchHandler} */}
      {isNotif && <Alert type={notifColor} clickHandler={notifToggle}>{message}</Alert>}
      <div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Akun Siswa" form="Form Tambah Akun Siswa">
          <Create loading={loading} submitHandler={submitHandler} kelas={kelas} />
        </InputData>
      </div>
      <TableFormat title='Akun Siswa' format={['No', 'Nama Siswa', 'Kelas', 'NIS', 'NISN', 'TTL', 'JK', 'Alamat', 'Angkatan', 'HP', 'Data Dibuat', 'Data Diubah']} loading={loading} error={error} data={dataSiswa}>
        {dataSiswa.map((siswa, index) => (
          <Tr>
            <Td>{getNum(page, index)}</Td>
            <Td><Link title={siswa.nama} /></Td>
            <Td><Link title={getKelas(siswa.kelas, tahunId)?.namaKelas} /></Td>
            <Td><Link title={siswa.nis} /></Td>
            <Td><Link title={siswa.nisn} /></Td>
            <Td><Link title={ttl(siswa.tempatLahir, siswa.tanggalLahir)} /></Td>
            <Td><Link title={siswa.jk} /></Td>
            <Td><Link title={siswa.alamat} /></Td>
            <Td><Link title={siswa.angkatan} /></Td>
            <Td><Link title={siswa.hp} /></Td>
            <Td><Link title={siswa.createdAt} /></Td>
            <Td><Link title={siswa.updatedAt} /></Td>
            <Td className='flex flex-row gap-2 justify-end'>
              <Button clickHandler={() => {
                dispatch(openEPopUp())
                setView(index)
              }} backgroundColor={'bg-orange-500'}><Edit /></Button>
              <Button clickHandler={() => deleteHandler(siswa.id)} backgroundColor={'bg-red-500'}><Delete /></Button>
            </Td>
          </Tr>
        ))
        }
      </TableFormat>
      {
        showEPopUp &&
        <PopUp title="Edit Data Siswa" onClose={() => dispatch(closeEPopUp())}>
          <Create data={dataSiswa[view]} kelas={kelas} submitHandler={(form) => editHandler(form)} loading={loading} />
        </PopUp>
      }
      <Pagination page={page} setPage={setPage} loading={loading} total={total} />
    </Index>
  )
}