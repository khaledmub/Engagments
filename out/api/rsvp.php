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
    // Check multiple locations for the database just to be safe
    $possiblePaths = [
        __DIR__ . '/../dev.db',            // If inside amr-yassmin/api
        __DIR__ . '/../../dev.db',         // If inside public_html/api
        __DIR__ . '/../../../dev.db'       // If inside amr-yassmin/out/api
    ];
    $dbPath = '';
    foreach ($possiblePaths as $path) {
        if (file_exists($path)) {
            $dbPath = $path;
            break;
        }
    }
    if (!$dbPath) { $dbPath = __DIR__ . '/../dev.db'; } // Fallback to create it in the parent folder

    $db = new PDO("sqlite:" . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if it doesn't exist to prevent 500 errors if dev.db is empty
    $db->exec('CREATE TABLE IF NOT EXISTS Guest (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        companions INTEGER DEFAULT 0,
        entryNumber TEXT UNIQUE NOT NULL,
        messageSent BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )');

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
