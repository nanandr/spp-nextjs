import Index from "../../index";
import Table from "@/components/Table";
import InputData from "@/components/InputData";
import Create from "./create";

export default function Kelas() {
  return (
		<Index title='Kelas > 10 RPL B' placeholder='Cari Siswa...'>
    	<div className="flex flex-row gap-2 justify-end">
        <InputData title="Input Data Siswa" form="Form Tambah Data Siswa">
          <Create/>
        </InputData>
      </div>
      <Table title='Kelas' data={[]}/>
    </Index>
  )
}