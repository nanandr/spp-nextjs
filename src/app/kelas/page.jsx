"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"

export default function Kelas() {
    async function api () {
        useEffect(() => {
          first
        
          return () => {
            second
          }
        }, [third])
        
    }
    return (
        <Index title='Kelas' placeholder='Cari Kelas...'>
            <Table title='Kelas' />
        </Index>
    )
}