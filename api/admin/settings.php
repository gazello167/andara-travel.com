<?php
require __DIR__ . '/guard.php';
require __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$UPLOAD_DIR = __DIR__ . '/../../uploads/';
$UPLOAD_URL_PREFIX = '/uploads/';

if ($method === 'GET') {
    $settings = $pdo->query('SELECT * FROM site_settings WHERE id = 1')->fetch(PDO::FETCH_ASSOC);
    echo json_encode($settings ?: new stdClass());
    exit;
}

// POST dikirim sebagai multipart/form-data (bukan JSON lagi) supaya bisa
// sekalian upload logo.
if ($method === 'POST') {
    $whatsapp        = trim($_POST['whatsapp'] ?? '');
    $wa_message      = trim($_POST['wa_message'] ?? '');
    $hero_title      = trim($_POST['hero_title'] ?? '');
    $hero_subtitle   = trim($_POST['hero_subtitle'] ?? '');
    $header_cta_text = trim($_POST['header_cta_text'] ?? '');
    $footer_address  = trim($_POST['footer_address'] ?? '');
    $footer_cta_text = trim($_POST['footer_cta_text'] ?? '');
    $logoUrl         = $_POST['existing_logo'] ?? '';

    if ($whatsapp === '' || $hero_title === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Nomor WhatsApp dan judul hero wajib diisi']);
        exit;
    }

    if (!empty($_FILES['logo']['name'])) {
        $allowed = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
        $ext = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));

        if (!in_array($ext, $allowed)) {
            http_response_code(400);
            echo json_encode(['error' => 'Format logo harus jpg, png, webp, atau svg']);
            exit;
        }
        if ($_FILES['logo']['size'] > 2 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['error' => 'Ukuran logo maksimal 2MB']);
            exit;
        }
        if (!is_dir($UPLOAD_DIR)) {
            mkdir($UPLOAD_DIR, 0755, true);
        }
        $filename = 'logo_' . uniqid() . '.' . $ext;
        move_uploaded_file($_FILES['logo']['tmp_name'], $UPLOAD_DIR . $filename);
        $logoUrl = $UPLOAD_URL_PREFIX . $filename;
    }

    $stmt = $pdo->prepare(
        'UPDATE site_settings SET whatsapp=?, wa_message=?, hero_title=?, hero_subtitle=?,
         logo_url=?, header_cta_text=?, footer_address=?, footer_cta_text=? WHERE id = 1'
    );
    $stmt->execute([
        $whatsapp, $wa_message, $hero_title, $hero_subtitle,
        $logoUrl, $header_cta_text, $footer_address, $footer_cta_text,
    ]);

    echo json_encode(['ok' => true, 'logo_url' => $logoUrl]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
