import Index from "./index";
import Table from "@/components/Table";
import { prisma } from "../../utils/prisma";

export default async function Dashboard() {
    return (
        <Index title='Dashboard' placeholder='Pencarian cepat...'>
            <div className="w-full grid grid-cols-2 xl:grid-cols-3 min-[2560px]:grid-cols-5 gap-2 md:gap-3">
                <Card content={await prisma.siswa.count()} title="Jumlah Siswa" background='bg-blue-600'/>
                <Card content="5" title="Transaksi Bulan Ini" background='bg-yellow-500'/>
                <Card content="7" title="Belum Lunas" background='bg-red-600'/>
                <Card content={await prisma.kelas.count()} title="Jumlah Kelas" background='bg-blue-400'/>
                <Card content="Rp. 200.000.000,-" title="Total Saldo" background='bg-green-600'/>
            </div>
            <Table title="Transaksi" data={[]} />
        </Index>
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