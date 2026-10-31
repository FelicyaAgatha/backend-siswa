import { NextResponse } from 'next/server';
import database from '../../../lib/database';

// Mengizinkan Flutter Web mengakses API saat latihan lokal.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const sql = `
      SELECT
        id,
        nipd,
        nama_lengkap,
        jenis_kelamin,
        alamat,
        kelas,
        jurusan
      FROM siswa
      ORDER BY id ASC
    `;

    const [rows] = await database.query(sql);

    return NextResponse.json(
      {
        status: true,
        message: 'Data siswa berhasil diambil',
        data: rows,
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error);

    return NextResponse.json(
      {
        status: false,
        message: 'Data siswa gagal diambil',
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}