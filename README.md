# Backend API Siswa

REST API pengelolaan data siswa menggunakan Next.js, TypeScript, dan MySQL. Backend ini digunakan untuk fitur data siswa pada aplikasi Flutter.

## Fitur

- Menampilkan seluruh siswa.
- Menampilkan detail siswa berdasarkan ID.
- Menambahkan siswa.
- Mengedit siswa.
- Menghapus siswa.
- Validasi data wajib, jenis kelamin, dan NIPD unik.

## Teknologi

- Next.js App Router
- TypeScript
- MySQL
- mysql2
- Postman

## Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/FelicyaAgatha/backend-siswa.git
cd backend-siswa
```

### 2. Install dependency

```bash
npm.cmd install
```

### 3. Siapkan database

Aktifkan MySQL melalui Laragon.

Buka HeidiSQL, lalu buka dan jalankan file:

```text
database/siswa.sql
```

File tersebut membuat database `db_toko` dan tabel `siswa` jika belum tersedia. File SQL hanya berisi struktur, sehingga data siswa perlu ditambahkan melalui POST.

### 4. Atur koneksi database

Salin `.env.example` menjadi `.env.local`.

Sesuaikan isinya dengan konfigurasi MySQL masing-masing:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=db_toko
```

### 5. Jalankan server

```bash
npm.cmd run dev -- --port 3001
```

Alamat dasar API:

```text
http://localhost:3001
```

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /api/siswa | Menampilkan seluruh siswa |
| GET | /api/siswa/{id} | Menampilkan detail siswa |
| POST | /api/siswa | Menambahkan siswa |
| PUT | /api/siswa/{id} | Mengedit siswa |
| DELETE | /api/siswa/{id} | Menghapus siswa |

Ganti `{id}` dengan ID siswa yang tersedia di database.

Endpoint siswa saat ini menggunakan No Auth.

## Contoh Body POST dan PUT

Pada Postman, pilih Body → raw → JSON.

```json
{
  "nipd": "24251001",
  "nama_lengkap": "Siswa Percobaan",
  "jenis_kelamin": "Perempuan",
  "alamat": "Parungpanjang",
  "kelas": "XII",
  "jurusan": "Rekayasa Perangkat Lunak"
}
```

Ketentuan:

- Semua kolom pada contoh wajib diisi.
- NIPD harus unik.
- Jenis kelamin: `Laki-laki` atau `Perempuan`.
- ID dibuat otomatis saat menambahkan siswa.
- GET dan DELETE tidak memerlukan body.

## Pengujian Postman

Import file berikut melalui tombol Import pada Postman:

```text
postman/APISiswa.postman_collection.json
```

Jalankan server dan MySQL sebelum mengirim request.

Urutan pengujian:

1. POST untuk menambahkan siswa dengan NIPD baru.
2. Catat ID dari response POST.
3. GET seluruh siswa.
4. GET berdasarkan ID tersebut.
5. PUT menggunakan ID tersebut.
6. DELETE menggunakan ID tersebut.
7. GET kembali untuk memastikan data sudah dihapus.

Sesuaikan ID pada URL request PUT dan DELETE dengan hasil POST. ID tidak selalu dimulai ulang setelah data dihapus.

## Status Response

| Status | Keterangan |
|---|---|
| 200 | Data berhasil diambil, diperbarui, atau dihapus |
| 201 | Siswa berhasil ditambahkan |
| 400 | Input tidak valid |
| 404 | Siswa tidak ditemukan |
| 409 | NIPD sudah digunakan |
| 500 | Terjadi kesalahan pada server |

## Koneksi dengan Flutter

Gunakan alamat API sesuai perangkat:

| Perangkat | Alamat dasar |
|---|---|
| Chrome di laptop server | http://localhost:3001 |
| Android Emulator | http://10.0.2.2:3001 |
| HP fisik | http://IP-LAPTOP:3001 |

Untuk HP fisik, gunakan IP lokal laptop dan hubungkan kedua perangkat ke jaringan yang sama. Pastikan koneksi ke port 3001 diizinkan firewall.

Repository frontend:

https://github.com/FelicyaAgatha/FlutterEnd

Backend ini khusus fitur siswa. Login pada aplikasi sebelumnya menggunakan backend Express terpisah di port 3000.