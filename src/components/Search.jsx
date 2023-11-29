import { Search as SearchIcon } from "../../public/svg"

export default function Search({ placeholder, search, setSearch, searchHandler }) {
	const submitHandler = (e) => {
		e.preventDefault()
		searchHandler()
	}
	
	return (
		<div className="bg-zinc-800 rounded-lg flex-grow">
			<form onSubmit={submitHandler} className="flex flex-row items-center justify-between rounded-lg bg-inherit" action="" method="post">
				<input value={search} onChange={(e) => setSearch(e.target.value)} autoComplete="off" className="text-sm transition-all appearance-none bg-inherit border-zinc-800 border rounded w-full py-3 px-3 mr-2 text-gray-300 leading-tight focus:outline-none focus:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2" type="search" placeholder={placeholder} name="search" />
				<button onSubmit={searchHandler} type="submit" className="text-white p-2 rounded-lg hover:bg-zinc-800 hover:bg-opacity-50">
					<SearchIcon className="w-4 h-4" />
				</button>
			</form>
		</div>
	)
}