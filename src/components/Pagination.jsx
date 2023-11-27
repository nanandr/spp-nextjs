import { take } from "../../utils/format"

export default function Pagination({ total, page, setPage, loading }) {
	const max = Math.ceil(total / take)
	return (
		!loading &&
		<div>
			<span className="block my-2">Total {total}</span>
			<span className="block my-2">Halaman <input type="number" onClick={(e) => e.target.select()} onChange={(e) => {
				const val = parseInt(e.target.value)
				val >= 1 && val <= max && setPage(val)
			}} onWheel={(e) => e.target.blur()} value={page} min={1} max={max} className="bg-zinc-800 py-2 rounded-lg text-center" /> / <input type="number" value={max} min={1} max={max} className="bg-zinc-800 py-2 rounded-lg text-center text-gray-500" disabled />
			</span>
			<div className="flex gap-2 my-2">
				<Button clickHandler={() => setPage(page - 1)} disableHandler={page == 1}><span>&#8592;</span></Button>
				<Pages page={page} setPage={setPage} max={max} />
				<Button clickHandler={() => setPage(page + 1)} disableHandler={page == max}><span>&#8594;</span></Button>
			</div>
		</div>
	)
}

function Pages({ page, setPage, max }) {
	const buttons = []
	for (let i = 1; i <= max; i++) {
		buttons.push(<Button clickHandler={() => setPage(i)} active={page == i} key={i}>{i}</Button>)
	}

	return <>{buttons.map(button => (button))}</>
}

function Button({ clickHandler, disableHandler, children, active }) {
	return (
		<button className={(disableHandler ? "text-gray-500" : "hover:bg-blue-400 active:bg-blue-500 ") + (active ? "bg-blue-400" : "bg-zinc-800") + " transition duration-200 p-3 rounded-lg aspect-square"} type="button" onClick={clickHandler} disabled={disableHandler}>{children}</button>
	)
}