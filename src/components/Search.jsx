import { Search as SearchIcon } from "../../public/svg"

export default function Search(props) {
    return (
        <div className="w-full">
            <form className="w-full flex flex-row items-center justify-between p-1 rounded-lg bg-zinc-700" action="" method="post">
                <input autoComplete="off" className="bg-zinc-700 w-full p-2" type="search" placeholder={props.placeholder} name="search"/>
                <span className="text-white p-2 rounded-lg">
                    <SearchIcon className="w-7 h-7"/>
                </span>
            </form>
        </div>
    )
}