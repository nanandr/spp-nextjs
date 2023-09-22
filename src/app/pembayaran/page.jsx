import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Pembayaran() {
    return (
        <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
            <Sidebar active='pembayaran'/>
            <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
                <Header title='Pembayaran'/>
                <main className="w-full min-h-screen bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col gap-2">
                    <div className="w-full grid grid-cols-2 xl:grid-cols-3 min-[2560px]:grid-cols-5 gap-2 md:gap-3">
                    <div className="flex flex-col overflow-x-auto">
                        <div className="sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium ">2</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4 ">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4 ">Cell</td>
                                    </tr>
                                    <tr className="border-b ">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium ">3</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className={"h-36 md:h-40 rounded-lg text-white p-4 flex flex-col justify-between " + props.background}>
            <h2 className="text-2xl font-bold">{props.title}</h2>
            <p className="text-6xl font-extrabold">30</p>
        </div>
    )
}