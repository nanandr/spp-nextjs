export default function Table(props) {
    const tableRow = props.data ? props.data : [
        {ID: 1,"Nama Siswa": "Rafi Ikhwan Purnama", "Nama Pegawai": "Muhammad Zubari Jaenal Adi", "Tanggal": "20/10/2006", Total: "Rp. 200.000,-", Bulan: "Juli", Status: true},
        {ID: 2,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 3,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: true},
        {ID: 4,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: true},
        {ID: 5,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 6,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 7,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 8,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: true},
        {ID: 9,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 10,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 11,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 12,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 13,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 14,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 15,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 16,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 17,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 18,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 19,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 20,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
        {ID: 21,"Nama Siswa": "cell", "Nama Pegawai": "cell", "Tanggal": "cell", Total: "cell", Bulan: "cell", Status: false},
    ];
    
    return(
        <div className="inline-block py-2 px-2">
            {
                props.title &&
                <h1 className="flex w-fit font-bold text-xl mb-2 cursor-default border-b border-b-zinc-700 hover:border-b-gray-300 transition-all">
                    Data {props.title}
                </h1>
            }
            <div className="overflow-x-auto w-full scroll pr-0.5">
                <table className="table-auto overflow-x-auto text-left text-sm font-light w-max-content lg:w-full">
                    <thead className="border-b font-medium dark:border-neutral-500 sticky top-0 bg-zinc-800">
                        <tr>
                            {Object.keys(tableRow[0]).map((key) => (
                                <th key={key} scope="col" className="px-6 py-4">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll"> {/* Adjust max-h-72 as needed */}
                        {tableRow.map((row) => (
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
    )
}