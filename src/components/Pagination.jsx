import { take } from "../../utils/format";

export default function Pagination({total, page, setPage, loading}) {
    return (
        !loading &&
        <div>
            <span className="block my-3">Halaman {page}</span>
            <div className="flex gap-2">
                <Button clickHandler={() => setPage(page - 1)} disableHandler={page == 1}><span>&#8592;</span></Button>
                <Button clickHandler={() => setPage(page + 1)} disableHandler={page == Math.ceil(total/take)}><span>&#8594;</span></Button>
            </div>
        </div>
    )
}

function Button({clickHandler, disableHandler, children}) {
    return (
        <button className={(disableHandler ? "text-gray-500" : "hover:bg-blue-400 active:bg-blue-500") + " transition duration-200 bg-zinc-800 p-3 rounded-lg aspect-square"} type="button" onClick={clickHandler} disabled={disableHandler}>{children}</button>
    )
}