"use client"

import { useDispatch, useSelector } from "react-redux"
import { Add } from "../../public/svg"
import PopUp from "./PopUp"
import { closePopUp, openPopUp, selectPopUpStat } from "@/redux/features/inputPopUpSlice"

export default function InputData({ title, form, children }) {
	const dispatch = useDispatch()
	const isPopUpOpen = useSelector(selectPopUpStat)

	const handlePopUp = () => {
		if (isPopUpOpen) {
			dispatch(closePopUp())
		} else {
			dispatch(openPopUp())
		}
	}

	return (
		<>
			<button
				onClick={handlePopUp}
				className="bg-zinc-800 px-5 py-2 hover:cursor-pointer rounded-lg flex w-fit hover:bg-zinc-900 transition duration-200 text-white flex-row align-middle items-center"
			>
				<Add />
				{title}
			</button>
			{isPopUpOpen && (
				<PopUp title={form} onClose={() => dispatch(closePopUp())}>
					{children}
				</PopUp>
			)}
		</>
	)
}