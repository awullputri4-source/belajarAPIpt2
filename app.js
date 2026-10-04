// URL API FastAPI kamu
const apiUrl = 'http://localhost:8000/catatan';

// Elemen HTML
const daftarCatatan = document.getElementById('daftarCatatan');
const inputTugas = document.getElementById('inputTugas');

// 1. Fungsi untuk Mengambil Data dari API (Metode GET)
async function ambilData() {
    try {
        const respon = await fetch(apiUrl); // Menghubungi API
        const hasil = await respon.json();  // Membaca jawaban JSON dari API

        // Bersihkan teks "Sedang memuat..."
        daftarCatatan.innerHTML = '';

        if (hasil.data.length === 0) {
            daftarCatatan.innerHTML = '<li class="tugas-item" style="justify-content:center; color: #eee;">✨ Belum ada tugas. Tambahkan sekarang!</li>';
            return;
        }

        // Tampilkan setiap data dari API ke layar
        hasil.data.forEach(catatan => {
            const li = document.createElement('li');
            li.className = 'tugas-item';
            li.innerHTML = `
                <span>${catatan.tugas}</span>
            `;
            daftarCatatan.appendChild(li);
        });
    } catch (error) {
        daftarCatatan.innerHTML = '<li class="tugas-item" style="color: #ff9a9e;">😭 Gagal terhubung ke API. Pastikan FastAPI berjalan!</li>';
    }
}

// 2. Fungsi untuk Menambah Data ke API (Metode POST)
async function tambahTugas() {
    const teksTugas = inputTugas.value;

    if (teksTugas.trim() === '') {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    try {
        // Mengirim data ke API dengan POST
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Mengubah format Javascript ke JSON untuk dikirim ke API
            body: JSON.stringify({
                tugas: teksTugas,
                selesai: false
            })
        });

        // Kosongkan kotak input setelah berhasil ditambah
        inputTugas.value = '';

        // Ambil ulang data terbaru dari API agar muncul di layar
        ambilData();

    } catch (error) {
        alert("Gagal menambahkan tugas.");
    }
}

// 3. Jalankan fungsi ambilData() otomatis saat web pertama kali dibuka
ambilData();
