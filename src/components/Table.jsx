export default function Table(props) {
    return(
        props.loading ?   
        <span>loading</span>
        :
        props.data ?
        <div className="inline-block py-2 px-2">
            {
                props.title &&
                <h1 className="flex w-fit font-bold text-xl mb-2 cursor-default border-b border-b-zinc-700 hover:border-b-gray-300 transition-all">
                    Data {props.title}
                </h1>
            }
            <div className="overflow-x-auto w-full scroll pr-0.5">
                <table className="table table-auto overflow-x-auto text-left text-sm font-light w-max-content lg:w-full">
                    <thead className="border-b font-medium dark:border-neutral-500 sticky top-0 bg-zinc-800">
                        <tr>
                            {Object.keys(props.data[0]).map((key) => (
                                <th key={key} scope="col" className="px-6 py-4">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll"> {/* Adjust max-h-72 as needed */}
                        {props.data.map((row) => (
                            <tr key={row.ID} className="border-b dark:border-neutral-500">
                                {Object.keys(row).map((key) => (
                                    <td key={key} className="whitespace-nowrap px-6 py-4">
                                        {key === 'Status' ? (<p className={(row[key] ? 'bg-green-700' : 'bg-red-700') + " p-1 whitespace-normal text-center rounded"}>{row[key] ? 'Lunas' : 'Belum Lunas'}</p>) : row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        :
        <span>Data Tidak Ada</span>
    )
}