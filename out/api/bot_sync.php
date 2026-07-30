<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple authentication token - the bot must send this
$SECRET = 'hostinger-bot-sync-token-9988';

$action = $_GET['action'] ?? '';
$token = $_GET['token'] ?? '';

if ($token !== $SECRET) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $dbPath = __DIR__ . '/../../dev.db';
    $db = new PDO("sqlite:" . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($action === 'get_pending') {
        // Fetch guests who haven't received a message yet
        $stmt = $db->query("SELECT * FROM Guest WHERE messageSent = 0");
        $guests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['pendingGuests' => $guests]);
        
    } elseif ($action === 'mark_sent') {
        // The bot sends the guest ID after successfully sending the WhatsApp message
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        
        if ($id) {
            $stmt = $db->prepare("UPDATE Guest SET messageSent = 1 WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing guest ID']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error', 'details' => $e->getMessage()]);
}
