import Header from "@/components/Header"
import Search from "@/components/Search"
import Sidebar from "@/components/Sidebar"
import { selectVisibility } from "@/redux/features/visibleSlice"
import { useSelector } from "react-redux"

export default function Index(props) {
	let isVisible
	props.notFound ? isVisible : isVisible = useSelector(selectVisibility)
	return (
		<div className="flex flex-row bg-black bg-opacity-90 min-h-screen overflow-hidden">
			<Sidebar active={props.title} />
			{
				props.notFound ?
					props.children
					:
					<>
						<div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
							<Header title={props.title} />
							{/* <Search placeholder={props.placeholder} /> */}
							<main className="w-full sm:max-w-[calc(100vw-365px)] max-h-fit bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col gap-2">
								{isVisible && <div className="sm:hidden fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 z-10" />}
								{props.children}
							</main>
						</div>
					</>
			}
		</div>
	)
}