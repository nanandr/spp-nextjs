"use client"
import Input from "@/components/Input";
import { useState } from "react";

export default function Create({data, submitHandler, loading}) {
    const currentData = data ?? '';
    const [form, setForm] = useState({
        id: currentData.id ?? '',
        tahun: currentData.tahun ?? '',
        spp: currentData.spp ?? ''
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
        submitHandler(form);
    }

    return (
        <form onSubmit={submit} className="m-3">
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="tahun">Tahun Ajar</label>
                <Input 
                    type="text" 
                    id='tahun' 
                    name='tahun' 
                    value={form['tahun']}
                    onChange={handleChange}
                />
            </div>
            <div className="my-3">
                <label className='block text-sm font-light mb-1' htmlFor="spp">SPP</label>
                <Input 
                    type="number" 
                    id='spp' 
                    name='spp' 
                    value={form['spp']}
                    placeholder='XX0.000,-'
                    onChange={handleChange}
                />
            </div>
            <button disabled={loading} type='submit' className={"w-full my-5 py-3 px-3 transition font-semibold " + (loading ? "bg-gray-700 font-semibold" : "bg-blue-400 hover:bg-blue-500")}>{loading ? "Loading..." : "Submit"}</button>
        </form>
    )
} 