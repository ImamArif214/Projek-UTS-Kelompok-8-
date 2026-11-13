
const express = require("express");
const router = express.Router();

const barang = require("../data/barang");

// 1. GET - Menampilkan semua barang
router.get("/", (req, res) => {
    res.json({
        pesan: "Daftar semua barang",
        data: barang
    });
});

// 2. POST - Menambahkan barang
router.post("/", (req, res) => {
    const { nama, kategori, stok, harga } = req.body;

    if (
        !nama ||
        !kategori ||
        stok == null ||
        harga == null ||
        !Number.isFinite(Number(stok)) ||
        !Number.isFinite(Number(harga)) ||
        Number(stok) < 0 ||
        Number(harga) < 0
    ) {
        return res.status(400).json({
            pesan: "Data barang tidak valid"
        });
    }

    const idBaru = barang.length > 0
        ? Math.max(...barang.map(b => b.id)) + 1
        : 1;

    const barangBaru = {
        id: idBaru,
        nama,
        kategori,
        stok: Number(stok),
        harga: Number(harga)
    };

    barang.push(barangBaru);

    res.status(201).json({
        pesan: "Barang berhasil ditambahkan",
        data: barangBaru
    });
});

// 3. GET - Mencari barang
router.get("/cari", (req, res) => {
    const namaCari = req.query.nama || "";

    const hasil = barang.filter(b =>
        b.nama.toLowerCase().includes(namaCari.toLowerCase())
    );

    res.json({
        pesan: "Hasil pencarian",
        data: hasil
    });
});

// 4. PUT - Mengubah barang
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const dataBarang = barang.find(b => b.id === id);

    if (!dataBarang) {
        return res.status(404).json({
            pesan: "Barang tidak ditemukan"
        });
    }

    const { nama, kategori, stok, harga } = req.body;

    if (
        (nama !== undefined &&
            (typeof nama !== "string" || !nama.trim())) ||
        (kategori !== undefined &&
            (typeof kategori !== "string" || !kategori.trim())) ||
        (stok !== undefined &&
            (!Number.isFinite(Number(stok)) || Number(stok) < 0)) ||
        (harga !== undefined &&
            (!Number.isFinite(Number(harga)) || Number(harga) < 0))
    ) {
        return res.status(400).json({
            pesan: "Data perubahan tidak valid"
        });
    }

    if (nama !== undefined) dataBarang.nama = nama;
    if (kategori !== undefined) dataBarang.kategori = kategori;
    if (stok !== undefined) dataBarang.stok = Number(stok);
    if (harga !== undefined) dataBarang.harga = Number(harga);

    res.json({
        pesan: "Barang berhasil diperbarui",
        data: dataBarang
    });
});

// 5. DELETE - Menghapus barang
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = barang.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            pesan: "Barang tidak ditemukan"
        });
    }

    const barangDihapus = barang.splice(index, 1);

    res.json({
        pesan: "Barang berhasil dihapus",
        data: barangDihapus[0]
    });
});

// Export router
module.exports = router;
