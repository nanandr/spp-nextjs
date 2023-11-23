"use client"

import { useState, useEffect } from "react"
import { Upload } from "../../public/svg"
import * as XLSX from "xlsx"
import PopUp from "./PopUp"
import TableFormat, { Tr, Td, Link } from "./TableFormat"
import { getNum, getUrl } from "../../utils/format"
import Input from "./Input"
import axios from "axios"
import { getId } from "@/redux/features/tahunAjarSlice"
import { useSelector } from "react-redux"

export default function UploadSheet() {
    const [kelas, setKelas] = useState([])
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [workBook, setWorkBook] = useState(null)
    const [page, setPage] = useState(0)
    const [showPopUp, setPopUp] = useState(false)
    const [loading, setLoading] = useState(false)

    const format = ['nis', 'nisn', 'nama', 'angkatan', 'jk', 'alamat', 'hp', 'tempatLahir', 'tanggalLahir']

    const tahunAjarId = useSelector(getId)

    const fetchKelas = async () => {
        await axios.get(getUrl('/api/kelas?page=all'))
            .then(res => setKelas(res.data.kelas))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchKelas()
    }, [])

    useEffect(() => {
        if(workBook) {
            const sheetName = workBook.SheetNames[page]
            const sheet = workBook.Sheets[sheetName]
            const parsedData = XLSX.utils.sheet_to_json(sheet)
            
            setData(parsedData)
            setPopUp(true)
        }
    }, [workBook, page])

    const fileUpload = (e) => {
        const reader = new FileReader()
        reader.readAsBinaryString(e.target.files[0])
        reader.onload = (e) => {
            const data = e.target.result
            setWorkBook(XLSX.read(data, { type: "binary" }))
        }
    }

    const resetPath  = (e) => {
        e.target.value = null
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    const handleSelect = (e) => {
        if(e.target.options) {
            setIndex(e.target.options.selectedIndex)
        }
        setSearch(e.target.value)
    }

    const submitHandler = async () => {
        setLoading(true)
        await axios.post(getUrl('/api/siswa/bulk'), {siswa: data, kelasId: kelas[index].id, tahunAjar: tahunAjarId})
            .then(res => console.log(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <label htmlFor="fileInput" className="bg-zinc-800 px-5 py-2 hover:cursor-pointer rounded-lg flex w-fit hover:bg-zinc-900 transition duration-200 text-white items-center" aria-label="Upload File">
                <Upload/>
                Unggah Data (.xlsx .xls)
            </label>
            <input id="fileInput" type={"file"} accept=".xlsx, .xls" className="hidden" aria-hidden="true" onChange={fileUpload} onClick={resetPath}/>
            {
                showPopUp &&
                <PopUp title="Unggah Data Siswa" onClose={handlePopUp}>    
                    <div className="w-full flex flex-row justify-between items-center">
                        <Pagination workBook={workBook} page={page} setPage={setPage}/>
                        <form onSubmit={submitHandler} className="flex flex-row gap-2">
                            <Input list="kelasList" type="text" id="nama_kelas" name="nama_kelas" value={search} onChange={handleSelect}/>
                            <datalist id="kelasList">
                                {
                                    kelas.map(i => (
                                        <option data-value={i.id} value={i.namaKelas}/>                                        
                                    ))
                                }
                            </datalist>
                            <button disabled={loading} type="submit" className={"py-3 px-3 transition font-semibold rounded-lg whitespace-nowrap " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>Input Data Siswa</button>
                        </form>
                    </div>
                    <TableFormat format={['no', ...format]} data={data}>
                        <Tr>
                            <Td>no</Td>
                            {Object.keys(data[0]).map(key => (
                                <Td key={key}>{key}</Td>
                            ))}
                        </Tr>
                        {data.map((siswa, index) => (
                            <Tr key={index}>
                                <Td>{getNum(1, index)}</Td>
                                {Object.keys(siswa).map(key => (
                                    <Td key={key}><Link href='' title={siswa[key]}>{siswa[key]}</Link></Td>
                                ))}         
                            </Tr>
                        ))}
                    </TableFormat>
                </PopUp>
            }
        </>
    )
}

function Pagination({page, setPage, workBook}) {
    return (
        <div className="flex flex-col px-3">
            <span className="mb-3">{workBook.SheetNames[page]}</span>
            {
                workBook.SheetNames.length > 1 &&
                <div className="flex flex-row gap-2 w-full">
                    <button className="rounded-lg aspect-square p-2 bg-black" disabled={page == 0} onClick={() => setPage(page - 1)}><span>&#8592;</span></button>
                    <span className="p-2 bg-black rounded-lg">{page + 1} / {workBook.SheetNames.length}</span>
                    <button className="rounded-lg aspect-square p-2 bg-black" disabled={page == workBook.SheetNames.length - 1} onClick={() => setPage(page + 1)}><span>&#8594;</span></button>
                </div>
            }
        </div>
    )
}