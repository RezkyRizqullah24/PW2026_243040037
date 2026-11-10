// src/FormTransaksi.jsx
// Komponen anak: formulir terkendali. Tidak menyimpan daftar transaksi,
// hanya "melapor" ke induk lewat props onTambah.
import { useState } from 'react';

function FormTransaksi({ onTambah }) {
  // Seluruh input terkendali: value berasal dari state, onChange menulis ke state
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');   // tetap teks selama diketik
  const [jenis, setJenis] = useState('pemasukan');

  // Validasi
  const nominalAngka = Number(nominal); // input selalu teks -> ubah jadi angka
  const nominalSalah = nominal !== '' && (isNaN(nominalAngka) || nominalAngka <= 0);
  const keteranganTerlaluPanjang = keterangan.length > 40;
  const tidakValid =
    keterangan.trim() === '' ||
    nominal === '' ||
    nominalSalah ||
    keteranganTerlaluPanjang;

  const tanganiKirim = (event) => {
    event.preventDefault();
    if (tidakValid) return;

    onTambah({
      keterangan: keterangan.trim(),
      nominal: nominalAngka, // simpan sebagai ANGKA, bukan teks
      jenis: jenis,
    });

    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
  };

  return (
    <form onSubmit={tanganiKirim} className="kolom">
      <input
        className="input"
        type="text"
        placeholder="Keterangan (contoh: Uang saku)"
        value={keterangan}
        onChange={(event) => setKeterangan(event.target.value)}
      />
      {keteranganTerlaluPanjang && (
        <p className="galat">Keterangan maksimal 40 karakter.</p>
      )}

      <div className="baris">
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Nominal (Rp)"
          value={nominal}
          onChange={(event) => setNominal(event.target.value)}
        />
        <select
          className="input"
          value={jenis}
          onChange={(event) => setJenis(event.target.value)}
        >
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
      </div>
      {nominalSalah && <p className="galat">Nominal harus berupa angka lebih dari 0.</p>}

      <button className="tombol" type="submit" disabled={tidakValid}>
        Tambah Transaksi
      </button>
    </form>
  );
}
export default FormTransaksi;
