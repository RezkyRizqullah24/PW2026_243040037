// src/format.js - fungsi bantu (bukan komponen) untuk menampilkan angka sebagai Rupiah
export function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}
