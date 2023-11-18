"use client"

import Index from "./index"
import Table from "@/components/Table"
import { useState, useEffect } from "react"
import { getUrl } from "../../utils/format"
import axios from "axios"

export default async function Dashboard() {
	const [dataSiswa, setDataSiswa] = useState([])
	const [dataKelas, setDataKelas] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchData = async () => {
		try {
			const res = await axios.get(getUrl(`/api/siswa?page=all`))
			const resKelas = await axios.get(getUrl('/api/kelas?page=all'))
			setDataSiswa(res.data.siswa)
			setDataKelas(resKelas.data.kelas)
		} catch (err) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Index title='Dashboard' placeholder='Pencarian cepat...'>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 min-[2560px]:grid-cols-5 gap-2 md:gap-3">
				<Card content={dataSiswa.length} title="Jumlah Siswa" background='bg-blue-600' loading={loading} />
				<Card content="5" title="Transaksi Bulan Ini" background='bg-yellow-500' loading={loading} />
				<Card content="7" title="Belum Lunas" background='bg-red-600' loading={loading} />
				<Card content={dataKelas.length} title="Jumlah Kelas" background='bg-blue-400' loading={loading} />
				<Card content="Rp. 200.000.000,-" title="Total Saldo" background='bg-green-600' loading={loading} />
			</div>
			<Table title="Transaksi" data={[]} />
		</Index>
	)
}

function Card(props) {
	return (
		<>
			{props.loading ?
				<div className={"h-36 md:h-40 rounded-lg p-4 flex flex-col justify-between animate-pulse " + props.background}>
					<div className="bg-gray-300 h-10 w-[calc(100vw/10)] rounded" />
					<div className="bg-gray-300 h-10 rounded"></div>
				</div>
				:
				<div className={"h-36 md:h-40 rounded-lg text-white p-4 flex flex-col justify-between " + props.background}>
					<h2 className="text-2xl font-bold">{props.title}</h2>
					<p className="text-4xl font-extrabold truncate">{props.content}</p>
				</div>
			}
		</>
	)
}