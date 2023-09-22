import Header from "@/components/Header";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
            <Sidebar active='dashboard'/>
            <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
                <Header title='Dashboard'/>
                <Search placeholder="Pencarian cepat..."/>
                <main className="w-full min-h-screen bg-zinc-700 p-2 md:p-3 rounded-lg flex flex-col gap-2">
                    <div className="w-full grid grid-cols-2 xl:grid-cols-3 min-[2560px]:grid-cols-5 gap-2 md:gap-3">
                        <Card content="30" title="Jumlah Siswa" background='bg-blue-600'/>
                        <Card content="5" title="Transaksi Bulan Ini" background='bg-yellow-500'/>
                        <Card content="7" title="Belum Lunas" background='bg-red-600'/>
                        <Card content="9" title="Jumlah Kelas" background='bg-blue-400'/>
                        <Card content="Rp. 200.000.000,-" title="Total Saldo" background='bg-green-600'/>
                    </div>
                    <h1 className="text-2xl font-bold">Transaksi</h1>
                </main>
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className={"h-36 md:h-40 rounded-lg text-white p-4 flex flex-col justify-between " + props.background}>
            <h2 className="text-2xl font-bold">{props.title}</h2>
            <p className="text-4xl font-extrabold truncate">{props.content}</p>
        </div>
    )
}