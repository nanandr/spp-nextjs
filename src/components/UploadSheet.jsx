"use client";

import { useState } from "react";
import { Upload } from "../../public/svg";
import * as XLSX from "xlsx";

export default function UploadSheet() {
    const [data, setData] = useState([]);

    const fileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workBook = XLSX.read(data, { type: "binary" });
            const sheetName = workBook.SheetNames[0];
            const sheet = workBook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            console.log(parsedData);
        }
    }

    return (
        <>
            <label htmlFor="fileInput" className="bg-zinc-800 px-5 py-2 hover:cursor-pointer rounded-lg flex w-fit hover:bg-zinc-900 transition duration-200 text-white" aria-label="Upload File">
                <Upload/>
                Unggah Data (.xlsx .xls)
            </label>
            <input id="fileInput" type={"file"} accept=".xlsx, .xls" className="hidden" aria-hidden="true" onChange={fileUpload}/>
        </>
    )
}