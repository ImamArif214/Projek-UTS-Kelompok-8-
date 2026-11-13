
const express = require("express");
const app = express();

const barangRoutes = require("./routes/barangRoutes");

// Middleware untuk membaca JSON
app.use(express.json());

// Route utama aplikasi
app.get("/", (req, res) => {
    res.json({
        pesan: "Selamat datang di API Manajemen Inventaris Barang",
        status: "Server berjalan"
    });
});

// Menghubungkan route barang
app.use("/barang", barangRoutes);

// Menjalankan server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
