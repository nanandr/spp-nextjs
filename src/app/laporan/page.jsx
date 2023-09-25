"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"

export default function Laporan() {
    async function api () {
        useEffect(() => {
          first
        
          return () => {
            second
          }
        }, [third])
        
    }
    return (
        <Index title='Laporan' placeholder='Cari Laporan...'>
            <Table title='Laporan' />
        </Index>
    )
}