<?php
// Endpoint publik -- dibaca oleh halaman utama React (tanpa login).
require __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
// Ganti '*' dengan domain situ kalau mau lebih ketat, misal:
// header('Access-Control-Allow-Origin: https://bandung-tour.com');
header('Access-Control-Allow-Origin: *');

$settings = $pdo->query('SELECT * FROM site_settings WHERE id = 1')
    ->fetch(PDO::FETCH_ASSOC);

$fleets = $pdo->query('SELECT name, price, capacity, image FROM fleets ORDER BY sort_order ASC, id ASC')
    ->fetchAll(PDO::FETCH_ASSOC);

$navItems = $pdo->query('SELECT label, href FROM nav_items ORDER BY sort_order ASC, id ASC')
    ->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'whatsapp'        => $settings['whatsapp'] ?? '',
    'wa_message'      => $settings['wa_message'] ?? '',
    'hero_title'      => $settings['hero_title'] ?? '',
    'hero_subtitle'   => $settings['hero_subtitle'] ?? '',
    'logo_url'        => $settings['logo_url'] ?? '',
    'header_cta_text' => $settings['header_cta_text'] ?? 'Hubungi Admin',
    'footer_address'  => $settings['footer_address'] ?? '',
    'footer_cta_text' => $settings['footer_cta_text'] ?? 'Chat WhatsApp Admin',
    'nav_items'       => $navItems,
    'fleets'          => $fleets,
]);
