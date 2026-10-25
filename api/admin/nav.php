<?php
require __DIR__ . '/guard.php';
require __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $items = $pdo->query('SELECT id, label, href, sort_order FROM nav_items ORDER BY sort_order ASC, id ASC')
        ->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id    = $data['id'] ?? null;
    $label = trim($data['label'] ?? '');
    $href  = trim($data['href'] ?? '');

    if ($label === '' || $href === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Label dan link wajib diisi']);
        exit;
    }

    if ($id) {
        $stmt = $pdo->prepare('UPDATE nav_items SET label=?, href=? WHERE id=?');
        $stmt->execute([$label, $href, $id]);
    } else {
        $maxOrder = (int) $pdo->query('SELECT COALESCE(MAX(sort_order),0) FROM nav_items')->fetchColumn();
        $stmt = $pdo->prepare('INSERT INTO nav_items (label, href, sort_order) VALUES (?, ?, ?)');
        $stmt->execute([$label, $href, $maxOrder + 1]);
        $id = $pdo->lastInsertId();
    }

    echo json_encode(['ok' => true, 'id' => $id]);
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
    $stmt = $pdo->prepare('DELETE FROM nav_items WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
