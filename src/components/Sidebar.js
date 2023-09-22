import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/image/logo90x90.png';

export default function Sidebar(props) {
    return (
        <aside className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-800 relative">
                <div className="flex flex-row align-middle">
                    <Image 
                        src={logo} 
                        alt="Logo SDQ Bina Mulya" 
                        width={48}
                        height={48}
                        className='object-contain select-none'
                    />
                    <div className="flex flex-col align-middle p-2">
                        <h3 className="text-white text-xl font-bold">SDQ Bina Mulya</h3>
                        <p className='text-gray-500'>Aplikasi SPP</p>
                    </div>
                </div>
                <ul className="space-y-4 font-medium my-5">
                    <Navigation title="Dashboard" href="/dashboard" active={props.active == 'dashboard' ? true : false }>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                    </Navigation>
                    <Navigation title="Pembayaran" href="/pembayaran" active={props.active == 'pembayaran' ? true : false }>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512">
                            <path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"/>
                        </svg>
                    </Navigation>
                    <Navigation title="Laporan" href="/laporan" active={props.active == 'laporan' ? true : false }>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                        </svg>
                    </Navigation>
                    <Dropdown title="Akun" links={[{name: 'Siswa', href: '/siswa'}, {name: 'Petugas', href: '/petugas'}]}>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                    </Dropdown>
                    <Navigation title="Kelas" href="/kelas" active={props.active == 'kelas' ? true : false }>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"/>
                        </svg>
                    </Navigation>
                </ul>
            </div>
        </aside>
    )
}

function Navigation(props) {
    return (
        <li>
            <Link href={props.href} className={(props.active ? "bg-blue-400 text-white " : "bg-gray-600 hover:bg-blue-400 text-gray-200 ") + "flex items-center px-2 py-4 hover:text-white transition duration-200 rounded-lg active:bg-blue-500 group"}>
                { props.children }
                <span className="ml-3">{ props.title }</span>
            </Link>
        </li>
    )
}

function Dropdown(props) {
    return (
        <li>
            <button type="button" className={(props.active ? "bg-blue-400 text-white " : "bg-gray-600 hover:bg-blue-400 text-gray-200 ") + "flex items-center justify-between px-2 py-4 hover:text-white transition duration-200 rounded-lg active:bg-blue-500 group w-full"} aria-controls="sidebar-dropdown" data-collapse-toggle="sidebar-dropdown">
                <div className='flex items-center'>
                    { props.children }
                    <span className="ml-3">{ props.title }</span>
                </div>
                <svg className="w-3 h-3 mx-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <ul id="sidebar-dropdown" className="py-2 space-y-2">
                {props.links.map(link => (
                    <li>
                        <Link href={link.href} className="flex items-center w-full p-2 text-gray-200 transition duration-200 rounded-lg group hover:text-white hover:bg-blue-400 active:bg-blue-500">{link.name}</Link>
                    </li>
                ))}
            </ul>
         </li>
    )
}