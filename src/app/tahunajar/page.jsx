"use client"

import Index from "../index"
import InputData from "@/components/InputData"
import { useState, useEffect } from "react"
import Create from "./create"
import axios from "axios"
import { deleteDialog, getNum, getUrl, take } from "../../../utils/format"
import TableFormat, { Button, Td, Tr } from "@/components/TableFormat"
import Pagination from "@/components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { closeEPopUp, openEPopUp, selectEPopUpStat } from "@/redux/features/editInputPopUpSlice"
import { Delete, Edit } from "../../../public/svg"
import PopUp from "@/components/PopUp"

export default function TahunAjar() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [dataTahun, setDataTahun] = useState([])
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const dispatch = useDispatch()
	const showEPopUp = useSelector(selectEPopUpStat)
	const [view, setView] = useState(0)
	const url = "/api/tahun/"

	const fetchData = async () => {
		try {
			const res = await axios.get(getUrl(`/api/tahun?take=${take}`))
			setDataTahun(res.data.tahun)
			setTotal(res.data.total)
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
		await axios.post(getUrl(url), data)
			.then(res => console.log(res))
			.catch(err => {
				console.error(err)
				setError(err.response.data.message)
			})
			.finally(() => fetchData())
	}

	const editHandler = async (form) => {
		setLoading(true)
		await axios.put(getUrl(`${url}${form.id}`), form)
			.then(res => console.log(res))
			.catch(err => {
				console.error(err)
				setError(err.response.data.message)
			})
			.finally(() => fetchData())
	}

	const deleteHandler = async (id) => {
		if (deleteDialog()) {
			setLoading(true)
			await axios.delete(getUrl(`${url}${id}`))
				.then(res => console.log(res))
				.catch(err => {
					console.error(err)
					setError(err.response.data.message)
				})
				.finally(() => fetchData())
		}
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
			<TableFormat title="Tahun Ajar" format={['No', 'Tahun', 'SPP', 'Data Dibuat', 'Data Diubah']} data={dataTahun} loading={loading} error={error}>
				{dataTahun.map((tahun, index) => (
					<Tr>
						<Td>{getNum(page, index)}</Td>
						<Td>{tahun.tahun}</Td>
						<Td>{tahun.spp[0].spp}</Td>
						<Td>{tahun.createdAt}</Td>
						<Td>{tahun.updatedAt}</Td>
						<Td className='flex flex-row gap-2 justify-end'>
							<Button clickHandler={() => {
								dispatch(openEPopUp())
								setView(index)
							}} backgroundColor={'bg-orange-500'}><Edit /></Button>
							<Button clickHandler={() => deleteHandler(tahun.id)} backgroundColor={'bg-red-500'}><Delete /></Button>
						</Td>
					</Tr>
				))}
			</TableFormat>
			{
				showEPopUp &&
				<PopUp title="Edit Data Tahun & SPP" onClose={() => dispatch(closeEPopUp())}>
					<Create data={dataTahun[view]} submitHandler={(form) => editHandler(form)} loading={loading} />
				</PopUp>
			}
			<Pagination page={page} setPage={setPage} loading={loading} total={total} />
		</Index>
	)
}