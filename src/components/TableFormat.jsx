import TableLoading from "./TableLoading"
import NextLink from 'next/link'

export default function TableFormat({ format, children, loading, title }) {
    return (
        <>
            { loading ? <TableLoading/> :
                <div className="inline-block p-2">
                    {
                        title &&
                        <h1 className="flex w-fit font-bold text-xl mb-2 cursor-default border-b border-b-zinc-700 hover:border-b-gray-300 transition-all">
                            Data { title }
                        </h1>
                    }
                    <div className="overflow-x-auto w-full scroll pr-0.5 min-h-[400px]">
                        <table className="table table-auto w-full overflow-scroll text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 sticky top-0 bg-zinc-800">
                                <tr>
                                    {format.map((key, index) => (
                                        <th key={index} scope="col" className="xl:px-6 xl:py-4 px-4 py-3">
                                            {key}
                                        </th>
                                    ))}
                                    {/* <th> FOR EDIT & DELETE */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-scroll">
                                { children }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export function Tr({ key, children }) {
    return (
        <tr key={key} className="border-b dark:border-neutral-500">
            { children }
        </tr>
    )
}

export function Td({ className, children }) {
    return (
        <td className={`whitespace-nowrap max-w-[200px] text-ellipsis overflow-hidden xl:px-6 xl:py-4 px-4 py-3 ${className}`}>
            { children }
        </td>
    )
}

export function Link({ title, href }) {
    return (
        <NextLink title={title} href={href ? href : ''}>{title}</NextLink>
    )
}

export function Button({ clickHandler, backgroundColor, children }) {
    return (
        <button onClick={clickHandler} className={`w-9 h-9 ${backgroundColor} p-2 rounded-md`} type='button'>{children}</button>
    )
}