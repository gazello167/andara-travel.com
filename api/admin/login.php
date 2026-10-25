<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Username dan password wajib diisi']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, password_hash FROM admin_users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Username atau password salah']);
    exit;
}

session_regenerate_id(true);
$_SESSION['admin_id'] = $user['id'];

echo json_encode(['ok' => true]);
