"use client"
import { useState } from "react";
import { Add } from "../../public/svg";
import PopUp from "./PopUp";

export default function InputData(props) {
    const [showPopUp, setPopUp] = useState(false);

    const handlePopUp = () => {
        setPopUp(false);
    }

    return (
        <>
            <button onClick={(e)=>setPopUp(true)} className="bg-zinc-800 px-5 py-2 hover:cursor-pointer rounded-lg flex w-fit hover:bg-zinc-900 transition duration-200 text-white flex-row align-middle">
                <Add/>
                Input Data Siswa
            </button>
            {
                showPopUp &&
                <PopUp title="Form Tambah Data Siswa" onClose={handlePopUp}>
                    { props.children }
                </PopUp>
            }
        </>
    )
}