"use client";

import { useEffect, useState } from 'react';
import HeaderProfile from './HeaderProfile';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { getUrl } from '../../utils/format';
import { useRouter } from 'next/navigation';

export default function Header(props) {
    const [ data, setData ] = useState([]);
    const [ active, setActive ] = useState({id: 0, tahun: ''});
    const router = useRouter();

    const fetchData = async () => {
        try {
            const res = await axios.get(getUrl('/api/tahun'));
            setData(res.data.tahun);
            setActive(res.data.tahun[0]);
        }
        catch(err) {console.error(err)}
    }

    const activeHandler = (link) => {
        setActive(link);
    } 

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        router.push(`${window.location.origin}${window.location.pathname}?tahun=${active.tahun}`);
    }, [active]);

    return (
        <div className="flex flex-row items-center w-full justify-between">
            <h1 className="text-4xl font-bold">{props.title}</h1>
            <div className='flex flex-row items-center gap-2'>
                <Dropdown data={data} active={active} setActive={activeHandler}/>
                <HeaderProfile/>
                <button type='button' onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}

function Dropdown({ data, active, setActive }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className='relative'>
            <button onClick={() => setVisible(!visible)} type="button" className={"bg-white hover:bg-gray-200 text-black flex items-center justify-between px-2 py-2 transition duration-200 rounded-lg group w-40"} aria-controls="tahun-ajar-dropdown" data-collapse-toggle="tahun-ajar-dropdown">
                <div className='flex items-center'>
                    <span className="ml-1">{ active.tahun }</span>
                </div>
                <svg className="w-3 h-3 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <ul id="tahun-ajar-dropdown" className={(visible ? "" : "hidden ") + "p-2 space-y-2 absolute w-full bg-gray-200 rounded-lg z-50"}>
                <li>
                    <button disabled={true} className={"text-black flex items-center w-full p-2 transition duration-200 rounded-lg group"}>Tahun Ajaran</button>
                </li>
                {data.map(link => (
                    <li>
                        <button disabled={link.id == active.id} onClick={() => setActive(link)} className={(link.id == active.id ? 'bg-blue-500 text-white ' : 'text-black hover:bg-gray-400 ') + "flex items-center w-full p-2 transition duration-200 rounded-lg group hover:text-white active:bg-blue-500"}>{link.tahun}</button>
                    </li>
                ))}
            </ul>
         </div>
    )
}