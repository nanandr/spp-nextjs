"use client"

import { useRef } from "react"
import html2pdf from 'html2pdf.js'

export default function Print() {
    const data = [{name: "Udin"}, {name: "Gaming"}]
    
    const printRef = useRef()

    const printHandler = () => {
        const printElement = printRef.current
        html2pdf().from(printElement).save()
    }

    return (
        <div className="bg-gray-400 w-full h-full font-serif py-5">
            <div ref={printRef} className="bg-white m-auto p-5 w-fit">
                <h1 className="text-center font-bold text-2xl py-5">Laporan Pembayaran SPP</h1>
                <table className="border border-collapse border-black">
                    <thead>
                        <tr>
                            <Th>Nama Petugas</Th>
                            <Th>Nama Siswa</Th>
                            <Th>Kelas</Th>
                            <Th>Bulan</Th>
                            <Th>Nominal SPP</Th>
                            <Th>Nominal Bayar</Th>
                            <Th>Tanggal Transaksi</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.name}</Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={printHandler}>Print</button>
        </div>
    )
}

function Th({ children }) {
    return (
        <th className="bg-slate-100 p-2 border border-black">{children}</th>
    )
}

function Td({ children }) {
    return (
        <td className="border border-black p-2">{children}</td>
    )
}