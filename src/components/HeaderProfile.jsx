import logo from '../../assets/image/logo90x90.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function HeaderProfile() {
	const { data: session } = useSession()

	return (
		<div className='rounded-lg text-right transition-transform -translate-x-full sm:translate-x-0 hidden sm:block hover:bg-zinc-700'>
			<div className='flex flex-row items-center gap-3'>
				<span className='max-w-xs truncate cursor-default'>{session ? session.user.nama : ''}</span>
				<Image
					src={logo}
					alt="Logo SDQ Bina Mulya"
					width={48}
					height={48}
					className='object-contain select-none'
				/>
			</div>
		</div>
	)
}