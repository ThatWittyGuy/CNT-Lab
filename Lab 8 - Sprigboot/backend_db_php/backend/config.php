<?php
$host = "localhost";
$dbname = "college_results";
$username = "root";  // your MySQL username
$password = "mysql@password123";  // your MySQL password

try {
    // Use charset=utf8 to avoid encoding issues
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Set error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Stop execution and display error message
    die("Connection failed: " . $e->getMessage());
}
?>
