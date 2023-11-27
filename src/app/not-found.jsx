import Link from "next/link"
import Index from "."

export default function NotFound() {
	return (
		<>
			<Index notFound="true">
				<div className="flex flex-col justify-center text-center min-h-screen w-full sm:ml-80 text-white rounded-lg box-border">
					<h1>404 | Halaman Ini Tidak Tersedia</h1>
					<Link className="text-gray-400 hover:text-white transition duration-200 mt-10" href='/'>Kembali ke halaman dashboard</Link>
				</div>
			</Index>
		</>
	)
}