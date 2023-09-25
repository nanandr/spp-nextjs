"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"

export default function Siswa() {
    async function api () {
        useEffect(() => {
          first
        
          return () => {
            second
          }
        }, [third])
        
    }
    return (
        <Index title='Siswa' placeholder='Cari Siswa (NIS, Nama, Tanggal)...'>
            <Table title='Siswa' />
        </Index>
    )
}