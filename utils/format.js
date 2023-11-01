export const take = parseInt(process.env.TAKE);

export const dateTimeFormat = (dateTime) => {
    if(dateTime !== null) {
        const input = new Date(dateTime);
        return input.toLocaleDateString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    return null;
}

export const getUrl = (path) => {
    return `${window.location.protocol}//${window.location.host}${path}`;
}

export const siswaFormat = async (data, page = 1) => {
    let no = (page - 1) * 5 + 1;
    const siswa = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "NIS": item.nis,
            "Nama": item.nama,
            "Kelas": `1 RPL A`,
            "Angkatan": item.angkatan,
            "JK": item.jk,
            "Hp": item.hp,
            "Alamat": item.alamat,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    });
    return siswa;
}

export const petugasFormat = async (data, page = 1) => {
    let no = (page - 1) * 5 + 1;
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
    });
    return petugas;
}

export const kelasFormat = async (data, page = 1) => {
    let no = (page - 1) * 5 + 1;
    const kelas = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "Nama": item.namaKelas,
            "Data dibuat": item.createdAt,
            "Data diubah": item.updatedAt
        }
    });
    return kelas;
}

export const pembayaranFormat = async (data, page = 1) => {
    let no = (page - 1) * 5 + 1;
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
    });
    return pembayaran;
}