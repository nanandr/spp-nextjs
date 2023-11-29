"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Book, Document, Menu, Money, People, Logout, Calendar } from '../../public/svg.js'
import logo from '../../assets/image/logo90x90.png'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { selectVisibility } from '@/redux/features/visibleSlice.js'
import { useSession } from 'next-auth/react'

export default function Sidebar(props) {
	const isVisible = useSelector(selectVisibility)
	const { data: session } = useSession()

	return (
		<aside className={(isVisible ? "" : "hidden ") + "sm:block fixed top-0 left-0 z-40 max-w-[calc(100vw/1.5)] sm:w-80 h-screen sm:translate-x-0"}>
			<div className="h-full px-3 py-4 overflow-y-auto bg-zinc-800 relative">
				<div className="flex flex-row align-middle">
					<Image
						src={logo}
						alt="Logo SDQ Bina Mulya"
						width={48}
						height={48}
						className='object-contain select-none'
					/>
					<div className="flex flex-col align-middle p-2">
						<h3 className="text-white text-xl font-bold">SDQ Bina Mulya</h3>
						<p className='text-gray-500'>Aplikasi SPP</p>
					</div>
				</div>
				<ul className="space-y-4 font-medium my-5 transition-all duration-200">
					<Navigation title="Dashboard" href="/" active={props.active == 'Dashboard' ? true : false} icon={<Menu />} />
					<Navigation title="Pembayaran" href="/pembayaran" active={props.active == 'Pembayaran' ? true : false} icon={<Money />} />
					<Navigation title="Laporan" href="/laporan" active={props.active == 'Laporan' ? true : false} icon={<Document />} />
					{session ? session.user.role == 'Admin' && <>
						<Dropdown title="Akun" links={[{ name: 'Siswa', href: '/siswa', active: props.active }, { name: 'Petugas', href: '/petugas', active: props.active }]} icon={<People />} />
						<Navigation title="Kelas" href="/kelas" active={props.active == 'Kelas' ? true : false} icon={<Book />} />
						<Navigation title="Tahun Ajar" href="/tahunajar" active={props.active == 'Tahun Ajar' ? true : false} icon={<Calendar />} />
					</> : ''}
				</ul>
				<div className="relative left-0 bottom-0 w-full">
					<button className="flex w-full text-gray-200 flex-row justify-between items-center px-2 py-4 bg-zinc-700 hover:bg-gray-600 hover:cursor-pointer transition duration-200 rounded-lg my-2" type='button' onClick={() => signOut()}><span>Logout</span><Logout /></button>
				</div>
			</div>
		</aside>
	)
}

function Navigation(props) {
	return (
		<li>
			<Link href={props.href} className={(props.active ? "bg-blue-400 text-white " : "bg-gray-600 hover:bg-blue-400 text-gray-200 ") + "flex items-center px-2 py-4 hover:text-white transition duration-200 rounded-lg active:bg-blue-500 group"}>
				{props.icon}
				<span className="ml-3">{props.title}</span>
			</Link>
		</li>
	)
}

function Dropdown(props) {
	const [visible, setVisible] = useState(true)

	return (
		<li>
			<button onClick={() => setVisible(!visible)} type="button" className={(props.active ? "bg-blue-400 text-white " : "bg-gray-600 hover:bg-blue-400 text-gray-200 ") + "flex items-center justify-between px-2 py-4 hover:text-white transition duration-200 rounded-lg active:bg-blue-500 group w-full"} aria-controls="sidebar-dropdown" data-collapse-toggle="sidebar-dropdown">
				<div className='flex items-center'>
					{props.icon}
					<span className="ml-3">{props.title}</span>
				</div>
				<svg className="w-3 h-3 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
				</svg>
			</button>
			<ul id="sidebar-dropdown" className={(visible ? "" : "hidden ") + "py-2 space-y-2"}>
				{props.links.map((link, index) => (
					<li key={index}>
						<Link href={link.href} className={(link.name == link.active ? "bg-blue-400 text-white " : " hover:bg-blue-400 text-gray-200 ") + "flex items-center w-full p-2 text-gray-200 transition duration-200 rounded-lg group hover:text-white hover:bg-blue-400 active:bg-blue-500"}>{link.name}</Link>
					</li>
				))}
			</ul>
		</li>
	)
}