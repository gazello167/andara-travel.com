<?php
require __DIR__ . '/guard.php';
require __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$UPLOAD_DIR = __DIR__ . '/../../uploads/';       // folder fisik di server
$UPLOAD_URL_PREFIX = '/uploads/';   // path publik sesuai URL situs

if ($method === 'GET') {
    $fleets = $pdo->query('SELECT id, name, price, capacity, image, sort_order FROM fleets ORDER BY sort_order ASC, id ASC')
        ->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($fleets);
    exit;
}

// POST dipakai untuk create ATAU update (kirim 'id' kalau mau update),
// dikirim sebagai multipart/form-data supaya bisa sekalian upload foto.
if ($method === 'POST') {
    $id       = $_POST['id'] ?? null;
    $name     = trim($_POST['name'] ?? '');
    $price    = trim($_POST['price'] ?? '');
    $capacity = trim($_POST['capacity'] ?? '');

    if ($name === '' || $price === '' || $capacity === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Nama, harga, dan kapasitas wajib diisi']);
        exit;
    }

    $imagePath = $_POST['existing_image'] ?? '';

    if (!empty($_FILES['image']['name'])) {
        $allowed = ['jpg', 'jpeg', 'png', 'webp'];
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

        if (!in_array($ext, $allowed)) {
            http_response_code(400);
            echo json_encode(['error' => 'Format foto harus jpg, jpeg, png, atau webp']);
            exit;
        }
        if ($_FILES['image']['size'] > 3 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['error' => 'Ukuran foto maksimal 3MB']);
            exit;
        }

        if (!is_dir($UPLOAD_DIR)) {
            mkdir($UPLOAD_DIR, 0755, true);
        }

        $filename = uniqid('fleet_') . '.' . $ext;
        move_uploaded_file($_FILES['image']['tmp_name'], $UPLOAD_DIR . $filename);
        $imagePath = $UPLOAD_URL_PREFIX . $filename;
    }

    if ($id) {
        $stmt = $pdo->prepare('UPDATE fleets SET name=?, price=?, capacity=?, image=? WHERE id=?');
        $stmt->execute([$name, $price, $capacity, $imagePath, $id]);
    } else {
        $stmt = $pdo->prepare('INSERT INTO fleets (name, price, capacity, image) VALUES (?, ?, ?, ?)');
        $stmt->execute([$name, $price, $capacity, $imagePath]);
        $id = $pdo->lastInsertId();
    }

    echo json_encode(['ok' => true, 'id' => $id, 'image' => $imagePath]);
    exit;
}

if ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $data);
    $id = $data['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID wajib diisi']);
        exit;
    }
    $stmt = $pdo->prepare('DELETE FROM fleets WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
