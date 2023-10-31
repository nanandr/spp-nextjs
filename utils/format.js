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

export const siswaFormat = async (data) => {
    let no = 1;
    const siswa = data.map(item => {
        return {
            "No": no++,
            "id": item.id,
            "NIS": item.nis,
            "Nama": item.nama,
            "Kelas": `1 RPL A`,
            "JK": item.jk,
            "Hp": item.hp,
            "Data dibuat": dateTimeFormat(item.createdAt),
            "Data diubah": dateTimeFormat(item.updatedAt)
        }
    });
    return siswa;
}