// src/RingkasanSaldo.jsx
// Komponen tampilan murni: semua angka dihitung dari props (nilai turunan, bukan state baru)
import { formatRupiah } from './format';

function RingkasanSaldo({ totalMasuk, totalKeluar }) {
  const saldo = totalMasuk - totalKeluar;

  return (
    <div>
      <p className={saldo < 0 ? 'saldo pengeluaran' : 'saldo pemasukan'}>
        {saldo < 0 ? '- ' : ''}
        {formatRupiah(Math.abs(saldo))}
      </p>
      <div className="rincian">
        <span>
          Pemasukan: <b className="pemasukan">{formatRupiah(totalMasuk)}</b>
        </span>
        <span>
          Pengeluaran: <b className="pengeluaran">{formatRupiah(totalKeluar)}</b>
        </span>
      </div>
    </div>
  );
}
export default RingkasanSaldo;
