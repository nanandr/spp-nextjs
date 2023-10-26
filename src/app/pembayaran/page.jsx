"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"

export default function Pembayaran() {
    async function api () {
        useEffect(() => {
          first
        
          return () => {
            second
          }
        }, [third])
        
    }
    return (
        <Index title='Pembayaran' placeholder='Cari Pembayaran (NIS, Nama, Tanggal)...'>
            <Table title='Pembayaran' data={[]}/>
        </Index>
    )
}