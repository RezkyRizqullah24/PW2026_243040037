import React from 'react';
import KartuProfil from './KartuProfil';
import BadgeSkill from './BadgeSkill';
import ItemMatkul from './ItemMatkul';
import KartuProyek from './KartuProyek';


function App() {
  // 1. Data daftar mata kuliah praktikum semester ini
  const daftarPraktikum = [
    { id: 101, kode: 'IF211', nama: 'Pemrograman Web (React & Laravel)', sks: 3, hari: 'Senin' },
    { id: 102, kode: 'IF212', nama: 'Sistem Basis Data (PostgreSQL)', sks: 3, hari: 'Rabu' },
    { id: 103, kode: 'IF213', nama: 'Rekayasa Perangkat Lunak Terapan', sks: 3, hari: 'Kamis' },
    { id: 104, kode: 'IF214', nama: 'Arsitektur Sistem Terdistribusi', sks: 2, hari: 'Jumat' },
  ];

  const daftarSkill = [
    { id: 1, namaSkill: 'HTML & CSS', level: 'Mahir' },
    { id: 2, namaSkill: 'JavaScript', level: 'Menengah' },
    { id: 3, namaSkill: 'React JS', level: 'Pemula' },
    { id: 4, namaSkill: 'Git & GitHub', level: 'Mahir' },
  ];

    const daftarProyek = [
    {
      id: 1,
      judul: 'Landing Page Toko Online',
      deskripsi: 'Halaman promosi responsif dengan katalog produk dan form kontak.',
      teknologi: ['HTML', 'CSS', 'JavaScript'],
      repoUrl: 'https://github.com/username/landing-toko',
    },
    {
      id: 2,
      judul: 'Aplikasi To-Do List',
      deskripsi: 'Mencatat, menandai, dan menghapus tugas harian.',
      teknologi: ['React', 'Vite'],
      repoUrl: 'https://github.com/username/todo-react',
    },
    {
      id: 3,
      judul: 'Sistem Informasi Perpustakaan',
      deskripsi: 'Pengelolaan data buku dan peminjaman berbasis web.',
      teknologi: ['PHP', 'MySQL', 'Bootstrap'],
      repoUrl: 'https://github.com/username/sip-perpus',
    },
    {
      id: 4,
      judul: 'Dashboard Cuaca',
      deskripsi: 'Menampilkan prakiraan cuaca dari API publik.',
      teknologi: ['React', 'REST API'],
      repoUrl: 'https://github.com/username/dashboard-cuaca',
    },
  ];

  // 2. Fungsi penanganan interaksi event tombol
  const notifikasiSapaan = () => {
    alert('Selamat datang di Modul 1! Anda berhasil menguasai fondasi arsitektur React JS.');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: '#1B365D', margin: '0 0 8px 0' }}>Praktikum Pemrograman Web</h1>
        <p style={{ color: '#666', fontSize: '15px' }}>
          Laboratorium Informatika - Modul 1: Pengenalan React JS & Vite
        </p>
      </header>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#2C3E50', borderBottom: '2px solid #E1E4E8', paddingBottom: '8px' }}>
          Profil Mahasiswa Praktikan
        </h2>
        <h3 style={{ color: '#2C3E50' }}>Keahlian</h3>
        {daftarSkill.map((skill) => (
          <BadgeSkill key={skill.id} namaSkill={skill.namaSkill} level={skill.level} />
        ))}
        <KartuProfil
          nama="Rezky Rizqullah"
          npm="243040037"
          kelas="D"
          status="Aktif"
          fotoUrl="https://via.placeholder.com/80"
        />
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#2C3E50', borderBottom: '2px solid #E1E4E8', paddingBottom: '8px' }}>
          Daftar Rencana Praktikum Semester (List Rendering)
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
                    {daftarPraktikum.map((matkul) => (
            <ItemMatkul key={matkul.id} {...matkul} />
          ))}
        </div>
      </section>

            <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#2C3E50', borderBottom: '2px solid #E1E4E8', paddingBottom: '8px' }}>
          Showcase Portofolio Mini
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {daftarProyek.map((proyek) => (
            <KartuProyek key={proyek.id} {...proyek} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={notifikasiSapaan}
          style={{
            backgroundColor: '#1B365D',
            color: '#FFFFFF',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          Uji Interaktivitas Event (Klik Disini)
        </button>
      </div>
    </div>
  );
}

export default App;