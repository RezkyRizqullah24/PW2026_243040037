// src/ItemTransaksi.jsx
import { formatRupiah } from './format';

function ItemTransaksi({ transaksi, onHapus }) {
  const adalahPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span className="keterangan">{transaksi.keterangan}</span>
      {/* className dinamis + ternary: hijau untuk pemasukan, merah untuk pengeluaran */}
      <span className={adalahPemasukan ? 'nominal pemasukan' : 'nominal pengeluaran'}>
        {adalahPemasukan ? '+ ' : '- '}
        {formatRupiah(transaksi.nominal)}
      </span>
      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}
export default ItemTransaksi;
