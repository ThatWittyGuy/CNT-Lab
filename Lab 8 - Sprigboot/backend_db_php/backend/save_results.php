<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

// Decode the JSON input from React frontend
$data = json_decode(file_get_contents('php://input'), true);

// Extract and sanitize input data
$student_name = $data['student_name'] ?? "";

$sub1_mid = floatval($data['subject1_midsem']);
$sub1_end = floatval($data['subject1_endsem']);
$sub2_mid = floatval($data['subject2_midsem']);
$sub2_end = floatval($data['subject2_endsem']);
$sub3_mid = floatval($data['subject3_midsem']);
$sub3_end = floatval($data['subject3_endsem']);
$sub4_mid = floatval($data['subject4_midsem']);
$sub4_end = floatval($data['subject4_endsem']);

// The SQL insert statement with placeholders
$sql = "INSERT INTO results 
(student_name, subject1_midsem, subject1_endsem, subject2_midsem, subject2_endsem, subject3_midsem, subject3_endsem, subject4_midsem, subject4_endsem)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

try {
    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);

    // Execute with an array of sanitized values
    $stmt->execute([
        $student_name, 
        $sub1_mid, $sub1_end, 
        $sub2_mid, $sub2_end, 
        $sub3_mid, $sub3_end, 
        $sub4_mid, $sub4_end
    ]);

    // Confirm success to frontend
    echo json_encode(["message" => "Result saved successfully"]);

} catch (PDOException $e) {
    // On error, send error message as JSON response
    http_response_code(500);
    echo json_encode(["error" => "Failed to save result: " . $e->getMessage()]);
}
?>
