// src/App.jsx  (Langkah 1-7 modul + Tugas 1 & Tugas 2)
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';

function App() {
  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan); // ubah teks JSON kembali menjadi array
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // ===== TUGAS 1: state untuk pilihan filter ('semua' | 'belum' | 'selesai') =====
  const [filter, setFilter] = useState('semua');

  // Efek A: dijalankan SEKALI saat App pertama kali tampil
  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!');
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // 2. Menambah tugas: buat array BARU berisi tugas lama + tugas baru
  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // 3. Mengubah status selesai: salin tugas yang dicentang, biarkan yang lain
  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai }; // salinan dengan status dibalik
      }
      return tugas; // tugas lain tidak berubah
    });
    setDaftarTugas(daftarBaru);
  };

  // 4. Menghapus tugas: ambil semua tugas KECUALI yang id-nya sama
  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // ===== TUGAS 2: hapus semua tugas yang berstatus selesai =====
  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // 5. Nilai turunan: dihitung dari state, tidak perlu state baru
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // ===== TUGAS 1: .filter() SEBELUM .map() =====
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === 'selesai') return tugas.selesai;
    if (filter === 'belum') return !tugas.selesai;
    return true; // 'semua'
  });

  // Data tombol filter, supaya JSX tidak diulang-ulang
  const pilihanFilter = [
    { kunci: 'semua', label: 'Semua' },
    { kunci: 'belum', label: 'Belum Selesai' },
    { kunci: 'selesai', label: 'Selesai' },
  ];

  return (
    <div className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {/* TUGAS 1: tiga tombol filter, yang aktif tampil berbeda (className dinamis) */}
        <div className="baris-filter">
          {pilihanFilter.map((pilihan) => (
            <button
              key={pilihan.kunci}
              className={filter === pilihan.kunci ? 'tombol-filter aktif' : 'tombol-filter'}
              onClick={() => setFilter(pilihan.kunci)}
            >
              {pilihan.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering: daftar kosong -> filter kosong -> daftar biasa */}
        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasTampil.length === 0 ? (
          <p className="kosong">Tidak ada tugas pada filter ini.</p>
        ) : (
          <ul className="daftar">
            {tugasTampil.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}

        {/* TUGAS 2: tombol hanya muncul jika minimal ada satu tugas selesai (&&) */}
        {jumlahSelesai > 0 && (
          <div className="aksi-bawah">
            <button className="tombol tombol-merah" onClick={hapusSemuaSelesai}>
              Hapus Semua yang Selesai
            </button>
          </div>
        )}
      </Kartu>
    </div>
  );
}
export default App;
