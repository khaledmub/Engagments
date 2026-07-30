<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $dbPath = __DIR__ . '/../../dev.db';
    $db = new PDO("sqlite:" . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // If it's a POST request, reset the messageSent flags
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['action']) && $input['action'] === 'resend_all') {
            $db->exec('UPDATE Guest SET messageSent = 0');
            echo json_encode(['success' => true]);
            exit;
        }
    }

    $stmt = $db->query('SELECT * FROM Guest ORDER BY createdAt DESC');
    $guests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'guests' => $guests]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
