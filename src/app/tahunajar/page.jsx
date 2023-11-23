"use client"

import Index from "../index"
import InputData from "@/components/InputData"
import { useState, useEffect } from "react"
import Create from "./create"
import axios from "axios"
import { getNum, getUrl, take } from "../../../utils/format"
import TableFormat, { Td, Tr } from "@/components/TableFormat"

export default function TahunAjar() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [dataTahun, setDataTahun] = useState([])
	const [page, setPage] = useState(1)

	const fetchData = async () => {
		try {
			const res = await axios.get(getUrl(`/api/tahun?take=${take}`))
			// const formattedData = await tahunFormat(res.data.tahun)
			setDataTahun(res.data.tahun)
		}
		catch (err) {
      		setError(err.message)
			console.log(err)
		}
		finally {
			setLoading(false)
		}
	}

	const submitHandler = async (data) => {
		setLoading(true)
		await axios.post(getUrl('/api/tahun'), data)
		 .then(res => console.log(res))
		 .catch(err => {
			console.error(err)
			setError(err.response.data.message)
		 })
		 .finally(() => fetchData())
	}

	useEffect(() => {
		fetchData()
	}, [])
	

  return (
		<Index title='Tahun Ajar' placeholder='Cari Tahun Ajar (2022/2023)...'>
			<div className="flex flex-row gap-2 justify-end">
				<InputData title="Input Data Tahun Ajar" form="Form Tambah Data Tahun Ajar">
					<Create loading={loading} submitHandler={submitHandler} />
				</InputData>
			</div>
			{/* <Table title='Tahun Ajar' data={dataTahun} loading={loading} error={error} /> */}
			<TableFormat title="Tahun Ajar" format={['No', 'Tahun', 'SPP', 'Data Dibuat', 'Data Diubah']} data={dataTahun} loading={loading} error={error}>
				{dataTahun.map((tahun, index) => (
					<Tr>
						<Td>{getNum(page, index)}</Td>
						<Td>{tahun.tahun}</Td>
						<Td>200000</Td>
						<Td>{tahun.createdAt}</Td>
						<Td>{tahun.updatedAt}</Td>
					</Tr>
				))}
			</TableFormat>
			{/* <Pagination page={page} setPage={setPage} loading={loading} total={total} /> */}
		</Index>
	)
}