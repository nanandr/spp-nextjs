"use client"
import Input from "@/components/Input";
import { useState } from "react";

export default function Create({ data, submitHandler, loading }) {
	const curData = data ?? ''
	const [form, setForm] = useState({
		id: curData.id ?? '',
		nama: curData.nama ?? '',
		nip: curData.nip ?? '',
		alamat: curData.alamat ?? '',
		jk: curData.jk ?? 'LakiLaki',
		hp: curData.hp ?? '',
		email: curData.email ?? '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prevForm => ({
			...prevForm,
			[name]: ['angkatan'].includes(name) ? parseInt(value) : value,
		}));
	};


	const submit = (e) => {
		e.preventDefault();
		submitHandler(form);
	}

	return (
		<form onSubmit={submit} className="m-3">
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="nis">NIP</label>
				<Input
					type="number"
					id='nip'
					name='nip'
					value={form['nip']}
					onChange={handleChange}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="nama">Nama Petugas</label>
				<Input
					type="text"
					id='nama'
					name='nama'
					value={form['nama']}
					onChange={handleChange}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="alamat">Alamat</label>
				<Input
					type="text"
					id='alamat'
					name='alamat'
					value={form['alamat']}
					onChange={handleChange}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="jk">Jenis Kelamin</label>
				<select
					defaultValue={"LakiLaki"}
					className="text-sm transition-all bg-zinc-800 bg-opacity-20 appearance-none border border-gray-600 rounded w-full py-3 px-3 text-gray-300 leading-tight focus:outline-none focus-within:bg-zinc-800 focus:bg-opacity-50 focus:outline focus:outline-zinc-700 focus:outline-offset-2"
					id='jk'
					name='jk'
					value={form['jk']}
					onChange={(e) => setForm(prev => ({
						...prev,
						jk: e.target.value
					}))}
				>
					<option value="LakiLaki">Laki-laki</option>
					<option value="Perempuan">Perempuan</option>
				</select>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="hp">Nomor Telepon</label>
				<Input
					type="number"
					id='hp'
					name='hp'
					value={form['hp']}
					onChange={handleChange}
				/>
			</div>
			<div className="my-3">
				<label className='block text-sm font-light mb-1' htmlFor="email">Email</label>
				<Input
					type="text"
					id='email'
					name='email'
					value={form['email']}
					onChange={handleChange}
				/>
			</div>
			{!Object.keys(curData).length > 0 &&
				<div className="my-3">
					<label className='block text-sm font-light mb-1' htmlFor="password">Password</label>
					<Input
						type="password"
						id='password'
						name='password'
						value={form['password']}
						onChange={handleChange}
					/>
				</div>
			}
			<button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
		</form>
	)
} 