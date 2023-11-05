"use client"
import Input from "@/components/Input";
import { useState } from "react";

export default function Create(props) {
    const currentData = props.data ?? '';
    const [form, setForm] = useState({
        id: currentData.id ?? '',
        namaKelas: currentData.Nama ?? '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };    
    
    
    const submit = (e) => {
        e.preventDefault();    
        props.submitHandler(form);
    }

    return (
        <form onSubmit={submit} className="m-3">
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="namaKelas">Nama Kelas</label>
                <Input
                    autoComplete='off' 
                    type="text" 
                    id='namaKelas' 
                    name='namaKelas' 
                    onChange={handleChange}
                    value={form['namaKelas']}
                    required
                />
            </div>
            <button disabled={props.loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (props.loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{props.loading ? "Loading..." : "Submit"}</button>
        </form>
    )
} 