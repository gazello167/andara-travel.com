<?php
// Panggil file ini di awal setiap endpoint admin yang butuh login.
session_start();
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Belum login']);
    exit;
}
