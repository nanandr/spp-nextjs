"use client";

import { useEffect, useState } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet";
import InputData from "@/components/InputData";

export default function Siswa() {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    fetch(`http://${window.location.host}/api/siswa`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setDataSiswa(data.siswa);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const submitHandler = async (e) => {
      e.preventDefault()
      setLoading(true);
      try{
          const body = { nama, nis, jk, kelas, angkatan, hp, diskon }
          await fetch(`/api/siswa`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
          })
          setLoading(false)
          setPopUp(false)
      }catch(error){
          console.log(error)
      }

      return router.push('/siswa')
  }

    return (
        <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama, Tanggal)...'>
            <div className="flex flex-row gap-2 justify-end">
              <UploadSheet/>
              <InputData submitHandler={submitHandler}/>
            </div>
            <Table title='Siswa' data={dataSiswa} loading={loading}/>
        </Index>
    )
}