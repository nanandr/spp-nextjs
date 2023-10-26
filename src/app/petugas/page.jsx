"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"

export default function Petugas() {
    async function api () {
        useEffect(() => {
          first
        
          return () => {
            second
          }
        }, [third])
        
    }
    return (
        <Index title='Petugas' placeholder='Cari Petugas (NIP, Nama)...'>
            <Table title='Petugas' data={[]}/>
        </Index>
    )
}