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

    return (
        <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama, Tanggal)...'>
            <div className="flex flex-row gap-2 justify-end">
              <UploadSheet/>
              <InputData/>
            </div>
            <Table title='Siswa' data={dataSiswa} loading={loading}/>
        </Index>
    )
}