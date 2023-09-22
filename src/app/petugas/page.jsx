import Header from "@/components/Header";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";

export default function Petugas() {
    return (
        <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
            <Sidebar active='Petugas'/>
            <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
                <Header title='Petugas'/>
                <Search placeholder="Cari Petugas..."/>
                <main className="w-full max-h-fit bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col gap-2">
                    <Table />
                </main>
            </div>
        </div>
    )
}