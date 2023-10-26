"use client";

import { useState } from 'react';
import HeaderProfile from './HeaderProfile';

export default function Header(props) {
    const dataTahun = [
        {tahun: '2023/2024', active: true},
        {tahun: '2022/2023', active: false},
        {tahun: '2021/2022', active: false},
        {tahun: '2020/2021', active: false}
    ];

    return (
        <div className="flex flex-row items-center w-full justify-between">
            <h1 className="text-4xl font-bold">{props.title}</h1>
            <div className='flex flex-row items-center gap-2'>
                <Dropdown links={dataTahun}/>
                <HeaderProfile/>
            </div>
        </div>
    )
}

function Dropdown(props) {
    const [tahunAjar, setTahunAjar] = useState(props.links);
    const [visible, setVisible] = useState(false);

    const handleTahunClick = (clicked) => {
        const update = tahunAjar.map((tahun) => ({
            ...tahun,
            active: tahun.tahun === clicked,
        }));
        setTahunAjar(update);
    }

    return (
        <div className='relative'>
            <button onClick={() => setVisible(!visible)} type="button" className={"bg-white hover:bg-gray-200 text-black flex items-center justify-between px-2 py-2 transition duration-200 rounded-lg group w-40"} aria-controls="tahun-ajar-dropdown" data-collapse-toggle="tahun-ajar-dropdown">
                <div className='flex items-center'>
                    <span className="ml-1">{ tahunAjar.find((tahun) => tahun.active)?.tahun }</span>
                </div>
                <svg className="w-3 h-3 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <ul id="tahun-ajar-dropdown" className={(visible ? "" : "hidden ") + "p-2 space-y-2 absolute w-full bg-gray-200 rounded-lg z-50"}>
                <li>
                    <button disabled={true} className={"text-black flex items-center w-full p-2 transition duration-200 rounded-lg group"}>Tahun Ajaran</button>
                </li>
                {tahunAjar.map(link => (
                    <li>
                        <button disabled={link.active} onClick={() => handleTahunClick(link.tahun)} className={(link.active ? 'bg-blue-500 text-white ' : 'text-black hover:bg-gray-400 ') + "flex items-center w-full p-2 transition duration-200 rounded-lg group hover:text-white active:bg-blue-500"}>{link.tahun}</button>
                    </li>
                ))}
            </ul>
         </div>
    )
}