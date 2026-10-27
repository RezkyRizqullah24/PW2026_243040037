import React from 'react';


const warnaLevel = {
  Pemula: { bg: '#FFF3CD', text: '#856404' },
  Menengah: { bg: '#D1ECF1', text: '#0C5460' },
  Mahir: { bg: '#D4EDDA', text: '#155724' },
};

function BadgeSkill({ namaSkill, level }) {
  const warna = warnaLevel[level] || { bg: '#E1E4E8', text: '#555' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        margin: '0 8px 8px 0',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'bold',
        backgroundColor: warna.bg,
        color: warna.text,
      }}
    >
      {namaSkill} · {level}
    </span>
  );
}

export default BadgeSkill;