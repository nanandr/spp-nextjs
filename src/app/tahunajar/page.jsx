"use client"

import Index from "../index"
import Table from "@/components/Table"
import InputData from "@/components/InputData"
import { useState, useEffect } from "react"
import axios from "axios"
import { getUrl, tahunFormat } from "../../../utils/format"

export default function TahunAjar() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [dataTahun, setDataTahun] = useState([])

	const fetchData = async () => {
		try {
			const res = await axios.get(getUrl('/api/tahun'));
			const formattedData = await tahunFormat(res.data.tahun)
			setDataTahun(formattedData)
		}
		catch (err) {
      setError(err.message);
			console.log(err)
		}
		finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	

  return (
		<Index title='Tahun Ajar' placeholder='Cari Tahun Ajar (2022/2023)...'>
			<div className="flex flex-row gap-2 justify-end">
				<InputData title="Input Data Tahun Ajar" form="Form Tambah Data Tahun Ajar">
					{/* <Create loading={loading} submitHandler={submitHandler} /> */}
				</InputData>
			</div>
			<Table title='Tahun Ajar' data={dataTahun} loading={loading} error={error} />
			{/* <Pagination page={page} setPage={setPage} loading={loading} total={total} /> */}
		</Index>
	)
}