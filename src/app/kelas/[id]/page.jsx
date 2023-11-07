"use client"

import Index from "../../index"
import Table from "@/components/Table"
import InputData from "@/components/InputData"
import UploadSheet from "@/components/UploadSheet"
import Create from "./create"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { getUrl, kelasSiswaFormat } from "../../../../utils/format"
import { useSearchParams } from "next/navigation"

export default function Kelas({ params }) {
  const [kelas, setKelas] = useState({})
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  const fetchData = async () => {
    try {
      const res = await axios.get(getUrl(`/api/kelas/${params.id}/siswa?tahun=${searchParams.get('tahun')}`))
      setKelas(res.data.kelas)
      const formattedData = await kelasSiswaFormat(res.data.kelasSiswa)
      setData(formattedData)
    }
    catch(err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchParams.get('tahun')])
  
  return (
		<Index title={`Kelas > ${kelas.namaKelas || ''}`} placeholder='Cari Siswa...'>
    	<div className="flex flex-row gap-2 justify-end">
        <UploadSheet />
        <InputData title="Input Data Siswa" form={`Form Tambah Data Siswa Kelas ${kelas.namaKelas || ''}`}>
          <Create/>
        </InputData>
      </div>
      <Table title={`Kelas ${kelas.namaKelas || ''}`} loading={loading} data={data}/>
    </Index>
  )
}