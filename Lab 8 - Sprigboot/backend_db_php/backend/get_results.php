<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

try {
    $stmt = $conn->prepare("SELECT * FROM results");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}

?>
