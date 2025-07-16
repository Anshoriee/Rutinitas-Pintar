<?php
// Contoh user hardcoded
$valid_email = "admin@example.com";
$valid_password = "123456";

// Ambil input dari form
$email = $_POST['email'];
$password = $_POST['password'];

// Proses login sederhana
if ($email === $valid_email && $password === $valid_password) {
    echo "<script>alert('Login berhasil!'); window.location.href = 'index.html';</script>";
} else {
    echo "<script>alert('Email atau kata sandi salah!'); window.location.href = 'masuk.html';</script>";
}
?>
