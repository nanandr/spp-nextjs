"use client";

import { useEffect } from "react"
import Index from "../index"
import Table from "@/components/Table"
import UploadSheet from "@/components/UploadSheet";
import InputData from "@/components/InputData";
import PopUp from "@/components/PopUp";
import prisma from './prismaClient'

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
            <div className="flex flex-row gap-2 justify-end">
              <UploadSheet/>
              <InputData/>
            </div>
            <Table title='Siswa' />
        </Index>
    )
}