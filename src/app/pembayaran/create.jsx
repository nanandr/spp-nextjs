"use client"

import Input from "@/components/Input"
import { useState } from "react"
import { useSession } from 'next-auth/react'
import { filterBulan } from "../../../utils/format"
import { closePopUp } from "@/redux/features/inputPopUpSlice"
import { useDispatch } from "react-redux"

export default function Create({ data, bulan, siswa, spp, submitHandler, loading }) {
	const { data: session } = useSession()
	const [totalBulan, setTotalBulan] = useState(1)
	let curr = new Date();
	const date = curr.toISOString().substring(0, 10);
	const dispatch = useDispatch()

	const [form, setForm] = useState({
		id: '',
		siswaId: siswa.id,
		userId: session.user.id,
		sppId: spp.id,
		tanggal: date,
		totalBulan: totalBulan,
		totalBayar: totalBulan * spp.spp,
		bulan: filterBulan(data, bulan),
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm(prevForm => ({
			...prevForm,
			[name]: value,
			totalBayar: name === 'totalBulan' ? value * spp.spp : prevForm.totalBayar,
		}))
		setTotalBulan(value)
	}

	const submit = (e) => {
		e.preventDefault()
		submitHandler(form)
		dispatch(closePopUp())
	}

	return (
		<form onSubmit={submit} className="m-3">
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="nama_siswa">Nama Siswa</label>
				<Input
					type="text"
					id='nama_siswa'
					name='nama_siswa'
					value={siswa.nama}
					disabled={true}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="nama_petugas">Nama Petugas</label>
				<Input
					type="text"
					id='nama_petugas'
					name='nama_petugas'
					value={session ? session.user.nama : ''}
					disabled={true}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="tanggal">Tanggal Bayar</label>
				<Input
					default={date}
					type="date"
					id='tanggal'
					name='tanggal'
					value={form['tanggal']}
					onChange={handleChange}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="totalBulan">Jumlah Bulan Bayar</label>
				<Input
					type="number"
					id='totalBulan'
					name='totalBulan'
					placeholder="Masukkan Jumlah Bulan"
					value={totalBulan}
					onChange={handleChange}
					onClick={(e) => e.target.select()}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="totalBayar">Jumlah Bayar</label>
				<Input
					type="number"
					id='totalBayar'
					name='totalBayar'
					value={form['totalBayar']}
					disabled={true}
				/>
			</div>
			<button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
		</form>
	)
} 