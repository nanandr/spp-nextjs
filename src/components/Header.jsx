"use client"

import { useEffect, useState } from 'react'
import HeaderProfile from './HeaderProfile'
import { useDispatch, useSelector } from "react-redux"
import { toggleVisibility, selectVisibility } from '../redux/features/visibleSlice'
import { setId } from '@/redux/features/tahunAjarSlice'
import axios from 'axios'
import { LeftArrow, RightArrow } from '../../public/svg'
import { getUrl, takeTahun } from '../../utils/format'
import { useRouter } from 'next/navigation'

export default function Header(props) {
    const [data, setData] = useState([])
    const [active, setActive] = useState({ id: 0, tahun: '' })
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const isVisible = useSelector(selectVisibility)
    const router = useRouter()

    const fetchData = async (index = 0) => {
        try {
            const res = await axios.get(getUrl(`/api/tahun?page=${page}`))
            const fetchedData = res.data.tahun
            setData(fetchedData)
            setTotal(res.data.total)

            setActive(fetchedData[index])
            dispatch(setId(fetchedData[index].id))
        }
        catch (err) {
            console.error(err)
        }
    }

    const activeHandler = (link) => {
        setActive(link)
        dispatch(setId(link.id))
    }

    const handleToggle = () => {
        dispatch(toggleVisibility())
    }

    useEffect(() => {
        fetchData()
    }, [page])

    useEffect(() => {
        const currentUrl = window.location.href
        const params = new URLSearchParams(window.location.search)
        const tahunParams = params.get('tahun')
        // if (tahunParams || currentUrl.endsWith('?tahun=')) { return }

        router.push(`${window.location.origin}${window.location.pathname}?tahun=${active ? active.tahun : ''}`)
    }, [active])

    return (
        <div className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-row items-center">
                <button title={`${isVisible ? 'Tutup Sidebar' : 'Buka Sidebar' }`} onClick={handleToggle} className={(isVisible ? 'ml-56 pl-1 z-20 text-zinc-400  ' : '-ml-4 ') + 'bg-zinc-800 rounded-e-md py-2 pr-1 mr-2 block sm:hidden text-white transition-all duration-100'}>{isVisible ? <LeftArrow /> : <RightArrow />}</button>
                <h1 className="text-4xl font-bold">{props.title}</h1>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <Dropdown data={data} active={active} setActive={activeHandler} total={total} page={page} setPage={setPage} />
                <HeaderProfile />
            </div>
        </div>
    )
}

function Dropdown({ data, active, setActive, total, page, setPage }) {
    const [visible, setVisible] = useState(false)
    const isVisible = useSelector(selectVisibility)

    return (
        <div className={(isVisible ? 'hidden' : '') + ' sm:block relative'}>
            <button onClick={() => setVisible(!visible)} type="button" className={"bg-white hover:bg-gray-200 text-black flex items-center justify-between px-2 py-2 transition duration-200 rounded-lg group w-40"} aria-controls="tahun-ajar-dropdown" data-collapse-toggle="tahun-ajar-dropdown">
                <div className='flex items-center'>
                    <span className="ml-1">{active ? active.tahun : ''}</span>
                </div>
                <svg className="w-3 h-3 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <ul id="tahun-ajar-dropdown" className={(visible ? "" : "hidden ") + "p-2 space-y-2 absolute w-full bg-gray-200 rounded-lg z-50"}>
                <li>
                    <button disabled={true} className={"text-black flex items-center w-full p-2 transition duration-200 rounded-lg group"}>Tahun Ajaran</button>
                </li>
                {data.map((link, index) => (
                    <li key={index}>
                        <button disabled={link.id == active.id} onClick={() => setActive(link)} className={(link.id == active.id ? 'bg-blue-500 text-white ' : 'text-black hover:bg-gray-400 ') + "flex items-center w-full p-2 transition duration-200 rounded-lg group hover:text-white active:bg-blue-500"}>{link.tahun}</button>
                    </li>
                ))}
                {
                    total > takeTahun &&
                    <Pagination total={total} page={page} setPage={setPage} />
                }
            </ul>
        </div>
    )
}

function Pagination({ total, page, setPage }) {
    const max = Math.ceil(total / takeTahun);

    return (
        <li>
            <div className="text-black flex flex-row items-center w-full rounded-lg group">
                <Button onClick={() => setPage(page - 1)} disabled={page == 1} className={'rounded-l-lg'}><span>&#8592;</span></Button>
                <Button onClick={() => setPage(page + 1)} disabled={page == max} className={'rounded-r-lg'}><span>&#8594;</span></Button>
            </div>
        </li>
    )
}

function Button({ onClick, className, disabled, children }) {
    return (
        <button onClick={onClick} type='button' className={`w-1/2 p-2 hover:bg-gray-400 hover:text-white ${className} ${disabled ? 'text-white' : 'active:bg-blue-500'}`} disabled={disabled}>{children}</button>
    )
}