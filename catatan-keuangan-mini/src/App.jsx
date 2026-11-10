// src/App.jsx - Catatan Keuangan Mini (Tugas 3)
// App = komponen induk: menyimpan state transaksi + fungsi pengubahnya.
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import RingkasanSaldo from './RingkasanSaldo';

const KUNCI_STORAGE = 'catatan-keuangan';

function App() {
  // State utama: baca dari localStorage (hanya sekali, lewat fungsi inisialisasi).
  // try/catch: jika isi localStorage rusak, aplikasi tidak crash dan mulai dari kosong.
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
      return dataTersimpan ? JSON.parse(dataTersimpan) : [];
    } catch {
      return [];
    }
  });

  // useEffect: simpan ke localStorage setiap daftarTransaksi berubah
  useEffect(() => {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  // Menambah: array BARU berisi transaksi lama + transaksi baru (immutable)
  const tambahTransaksi = ({ keterangan, nominal, jenis }) => {
    const transaksiBaru = { id: Date.now(), keterangan, nominal, jenis };
    setDaftarTransaksi([...daftarTransaksi, transaksiBaru]);
  };

  // Menghapus: ambil semua transaksi KECUALI yang id-nya sama
  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((transaksi) => transaksi.id !== id));
  };

  // Nilai turunan (dihitung dari state, bukan state baru)
  const totalMasuk = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pemasukan')
    .reduce((total, transaksi) => total + transaksi.nominal, 0);

  const totalKeluar = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pengeluaran')
    .reduce((total, transaksi) => total + transaksi.nominal, 0);

  return (
    <div className="wadah">
      <h1 className="judul">Catatan Keuangan Mini</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: Tugas Terstruktur</p>

      <Kartu judul="Saldo Saat Ini">
        <RingkasanSaldo totalMasuk={totalMasuk} totalKeluar={totalKeluar} />
      </Kartu>

      <Kartu judul="Tambah Transaksi">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      <Kartu judul="Riwayat Transaksi">
        {/* Pesan khusus jika belum ada transaksi */}
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Catat pemasukan atau pengeluaran pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((transaksi) => (
              <ItemTransaksi
                key={transaksi.id}
                transaksi={transaksi}
                onHapus={hapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}
export default App;
