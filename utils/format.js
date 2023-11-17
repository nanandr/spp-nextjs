// export const take = parseInt(process.env.TAKE)
export const take = 5
export const takeTahun = 5

export const paginate = (page, total, itemsPerPage = take, type = 'sql') => {
    let skip = 0

    if (page) {
        if (page === 'all') {
            itemsPerPage = total
        }
        else {
            skip = (page - 1) * itemsPerPage
        }
    }

    if(type === 'array') {
        return {
            start: skip > 1 ? skip : 0,
            end: skip + itemsPerPage
        }
    }

    return {
        skip: skip > 1 ? skip : 0,
        take: itemsPerPage
    }
}

export const dateTimeFormat = (dateTime) => {
    if (dateTime !== null) {
        const input = new Date(dateTime)
        return input.toLocaleDateString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }
    return null
}

export const getUrl = (path) => {
    return `${window.location.protocol}//${window.location.host}${path}`
}

const getNumber = (page) => {
    return (page - 1) * take + 1
}

export const getNum = (page, index) => {
    return (page - 1) * take + index + 1
}

export const deleteDialog = () => {
    if(confirm('Konfirmasi hapus data?')) {
        return true
    }
    return false
}

export const tahunFormat = async (data, page = 1) => {
    let no = getNumber(page)
    const tahun = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "tahun": item.tahun,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    })
    return tahun
}

export const siswaFormat = async (data, page = 1, tahunParams) => {
    let no = getNumber(page)
    const siswa = data.map(item => {
        const kelas = item.kelas.find(i => i.tahunAjar === tahunParams)

        return {
            "No": no++,
            "id": item.id,
            "NIS": item.nis,
            "NISN": item.nisn,
            "Nama": item.nama,
            "Kelas": kelas ? kelas.namaKelas : '',
            "Angkatan": item.angkatan,
            "JK": item.jk,
            "Hp": item.hp,
            "Alamat": item.alamat,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    })
    return siswa
}

export const petugasFormat = async (data, page = 1) => {
    let no = getNumber(page)
    const petugas = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "NIP": item.nip,
            "Nama": item.nama,
            "Alamat": item.alamat,
            "JK": item.jk,
            "Hp": item.hp,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    })
    return petugas
}

export const kelasFormat = async (data, page = 1) => {
    let no = getNumber(page)
    const kelas = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "Nama": item.namaKelas,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    })
    return kelas
}

export const getKelas = (kelasSiswa, tahunId) => {
    return kelasSiswa.find(kelas => kelas.tahunId === tahunId)
}

export const kelasSiswaFormat = async (data, page = 1) => {
    let no = getNumber(page)
    const kelasSiswa = data.map(item => {
        return {
            "No": no++,
            "id": item.siswa.id,
            "NIS": item.siswa.nis,
            "Nama": item.siswa.nama,
            // "Kelas": kelas ? kelas.namaKelas : '',
            "Angkatan": item.siswa.angkatan,
            "JK": item.siswa.jk,
            "Hp": item.siswa.hp,
            "Alamat": item.siswa.alamat,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    })
    return kelasSiswa
}

export const pembayaranFormat = async (data, page = 1) => {
    let no = getNumber(page)
    const pembayaran = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "Nama Siswa": item.namaSiswa,
            "Nama Petugas": item.namaPetugas,
            "Tanggal Bayar": item.tanggalBayar,
            "Total Bayar": item.totalBayar,
            "Bulan": item.bulan,
            "Data diubah": item.createdAt,
            "Data diubah": item.updatedAt,
        }
    })
    return pembayaran
}

export const isEmpty = (object) => {
    for (const prop in object){
        if(Object.hasOwn(object, prop)) {
            return false
        }
    }
    return true
}