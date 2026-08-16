// @ts-nocheck

const form = document.getElementById('motivasiForm');
const container = document.getElementById('container');

// Fungsi untuk menampilkan semua data motivasi dari LocalStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('motivasiData')) || [];
    container.innerHTML = '';
    
    // Looping data dengan index agar bisa dihapus secara spesifik
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <p><b>${item.text}</b></p>
            <img src="${item.image}">
            <button class="btn-hapus" onclick="hapusMotivasi(${index})">Hapus</button>
        `;
        container.appendChild(card);
    });
}

// Fungsi untuk menyimpan data motivasi baru
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('textInput').value;
    const fileInput = document.getElementById('imageInput');
    const files = fileInput.files;

    // VALIDASI: Pastikan ada file yang dipilih
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const existingData = JSON.parse(localStorage.getItem('motivasiData')) || [];
        
        existingData.push({ text: text, image: imageUrl });
        localStorage.setItem('motivasiData', JSON.stringify(existingData));
        
        form.reset();
        loadData();
    };
    
    // PERBAIKAN: Membaca file pertama [0], bukan membaca object 'files' langsung
    reader.readAsDataURL(files[0]); 
});

// Fungsi untuk menghapus motivasi berdasarkan index elemen
window.hapusMotivasi = function(index) {
    const existingData = JSON.parse(localStorage.getItem('motivasiData')) || [];
    
    // Hapus 1 item pada index yang dipilih
    existingData.splice(index, 1);
    
    // Simpan kembali data terbaru ke LocalStorage
    localStorage.setItem('motivasiData', JSON.stringify(existingData));
    
    // Refresh tampilan halaman
    loadData();
}

// Jalankan fungsi loadData pertama kali saat halaman dibuka
loadData();
