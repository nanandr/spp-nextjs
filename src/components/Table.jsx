export default function Table(props) {
    const tableRow = [
        {id: 1,siswa_name: "Rafi Ikhwan Purnama", pegawai_name: "Muhammad Zubari Jaenal Adi", date: "20/10/2006", total: "Rp. 200.000,-", bulan: "Juli", status: true},
        {id: 2,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 3,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: true},
        {id: 4,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: true},
        {id: 5,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 6,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 7,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 8,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: true},
        {id: 9,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 10,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 11,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 12,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 13,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 14,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 15,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 16,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 17,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 18,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 19,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 20,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
        {id: 21,siswa_name: "cell", pegawai_name: "cell", date: "cell", total: "cell", bulan: "cell", status: false},
    ]
    
    return(
        <div className="inline-block py-2 px-2">
            <h1 className="flex w-fit font-bold text-xl mb-2 cursor-default border-b border-b-zinc-700 hover:border-b-gray-300 transition-all">Data {props.title}</h1>
            <div className="overflow-x-auto w-ful max-h-96 scroll">
                <table className="table-auto overflow-x-auto text-left text-sm font-light w-max-content lg:w-full">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Nama Siswa</th>
                        <th scope="col" className="px-6 py-4">Nama Pegawai</th>
                        <th scope="col" className="px-6 py-4">Tanggal</th>
                        <th scope="col" className="px-6 py-4">Total</th>
                        <th scope="col" className="px-6 py-4">Bulan</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRow.map((row)=> (
                            <tr key={row.id} className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{row.id}</td>
                                <td className="whitespace-nowrap px-6 py-4">{row.siswa_name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{row.pegawai_name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{row.date}</td>
                                <td className="whitespace-nowrap px-6 py-4">{row.total}</td>
                                <td className="whitespace-nowrap px-6 py-4">{row.bulan}</td>
                                <td className="text-center whitespace-nowrap font-medium">
                                    <span className={(row.status? "bg-green-700" : "bg-red-700") + " p-1 whitespace-normal block w-28 rounded"}>
                                        {row.status? "Lunas" : "Belum Lunas" }
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}