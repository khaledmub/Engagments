<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // dev.db is in the root directory, 2 levels up from api/rsvp.php
    $dbPath = __DIR__ . '/../../dev.db';
    $db = new PDO("sqlite:" . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? null;
    $phone = $input['phone'] ?? null;
    $companions = isset($input['companions']) ? (int)$input['companions'] : 0;

    if (!$name || !$phone) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and phone are required']);
        exit;
    }

    $entryNumber = (string)rand(1000, 9999);
    
    // createdAt has default value CURRENT_TIMESTAMP in Prisma but passing it explicitly or ignoring it works.
    $stmt = $db->prepare('INSERT INTO Guest (name, phone, companions, entryNumber, messageSent) VALUES (:name, :phone, :companions, :entryNumber, 0)');
    
    $stmt->execute([
        ':name' => $name,
        ':phone' => $phone,
        ':companions' => $companions,
        ':entryNumber' => $entryNumber
    ]);

    $lastId = $db->lastInsertId();

    echo json_encode([
        'success' => true,
        'guest' => [
            'id' => $lastId,
            'name' => $name,
            'phone' => $phone,
            'companions' => $companions,
            'entryNumber' => $entryNumber,
            'messageSent' => false
        ],
        'entryNumber' => $entryNumber
    ]);

} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Integrity constraint violation (UNIQUE constraint)
        http_response_code(500);
        echo json_encode(['error' => 'Entry number collision, please try again.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
    }
}
