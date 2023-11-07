"use client"

import { useState } from "react";
import { Delete, Edit } from "../../public/svg";
import PopUp from "./PopUp";
import Link from 'next/link';
import { deleteDialog } from "../../utils/format";

export default function Table({ data, deleteHandler, editHandler, viewHandler, error, loading, title }) {
    const [showPopUp, setPopUp] = useState(false)

    const handlePopUp = () => {
        setPopUp(false)
    }

    const handleEditClick = (index) => {
        editHandler.indexHandler(index)
        setPopUp(true)
    }

    return (
        <>
            {
                showPopUp &&
                <PopUp title={editHandler.title} onClose={handlePopUp}>
                    {editHandler.form()}
                </PopUp>
            }
            {
                loading ?
                    <div className="inline-block py-2 px-2 animate-pulse space-y-4">
                        <div className="bg-gray-400 h-7 w-40 rounded" />
                        <div className="bg-zinc-800 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                        <div className="bg-zinc-600 h-10 rounded" />
                    </div>
                    :
                    <div className="inline-block p-2">
                        {
                            title &&
                            <h1 className="flex w-fit font-bold text-xl mb-2 cursor-default border-b border-b-zinc-700 hover:border-b-gray-300 transition-all">
                                Data {title}
                            </h1>
                        }
                        {
                            data.length > 0 ?
                                <div className="overflow-x-auto w-full scroll pr-0.5 min-h-[400px]">
                                    <table className="table table-auto w-full overflow-scroll text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500 sticky top-0 bg-zinc-800">
                                            <tr>
                                                {Object.keys(data[0]).map((key) => (
                                                    key !== 'id' &&
                                                    <th key={key} scope="col" className="xl:px-6 xl:py-4 px-4 py-3">
                                                        {key}
                                                    </th>
                                                ))}
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-y-scroll">
                                            {data.map((row, index) => (
                                                <tr key={row.id} className="border-b dark:border-neutral-500">
                                                    {Object.keys(row).map((key) => (
                                                        key !== 'id' &&
                                                        <td key={key} className="whitespace-nowrap max-w-[200px] text-ellipsis overflow-hidden xl:px-6 xl:py-4 px-4 py-3">
                                                            <Link href={ viewHandler ? viewHandler + row.id : '' } title={row[key]}>
                                                                {key === 'Status' ? (<p className={(row[key] ? 'bg-green-700' : 'bg-red-700') + " p-1 whitespace-normal text-center rounded"}>{row[key] ? 'Lunas' : 'Belum Lunas'}</p>) : row[key]}
                                                            </Link>
                                                        </td>
                                                    ))}
                                                    <td className="flex flex-row gap-2 py-3 justify-end">
                                                        {
                                                            editHandler &&
                                                            <button onClick={() => handleEditClick(index)} className="w-9 h-9 bg-orange-500 p-2 rounded-md"><Edit /></button>
                                                        }
                                                        {
                                                            deleteHandler &&
                                                            <button onClick={() => { deleteDialog() && deleteHandler(row.id) }} className="w-9 h-9 bg-red-500 p-2 rounded-md"><Delete /></button>
                                                        }
                                                        </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <span>{error ? error : 'Data Tidak Ada'}</span>
                        }
                    </div>
            }
        </>
    )
}