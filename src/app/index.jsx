import Header from "@/components/Header"
import Search from "@/components/Search"
import Sidebar from "@/components/Sidebar"

export default function Index(props) {
    return (
        <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
            <Sidebar active={props.title} />
            {
                props.notFound ?
                    props.children
                    :
                    <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
                        <Header title={props.title} />
                        <Search placeholder={props.placeholder} />
                        <main className="w-full sm:max-w-[calc(100vw-365px)] max-h-fit bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col gap-2">
                            {props.children}
                        </main>
                    </div>
            }
        </div>
    )
}