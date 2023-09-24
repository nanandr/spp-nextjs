import { Search as SearchIcon } from "../../public/svg"

export default function Search(props) {
    return (
        <div className="w-full">
            <form className="w-full flex flex-row items-center justify-between p-1 rounded-lg bg-zinc-700" action="" method="post">
                <input autoComplete="off" className="text-sm transition-all bg-zinc-700 appearance-none border border-zinc-700 rounded w-full py-3 px-3 mr-2 text-gray-300 leading-tight focus:outline-none focus:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-gray-800 focus:outline-offset-2" type="search" placeholder={props.placeholder} name="search"/>
                <button type="submit" className="text-white p-2 rounded-lg hover:bg-zinc-800 hover:bg-opacity-50">
                    <SearchIcon className="w-7 h-7"/>
                </button>
            </form>
        </div>
    )
}