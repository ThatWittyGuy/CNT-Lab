CREATE DATABASE IF NOT EXISTS college_results;
USE college_results;

CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  subject1_midsem FLOAT,
  subject1_endsem FLOAT,
  subject2_midsem FLOAT,
  subject2_endsem FLOAT,
  subject3_midsem FLOAT,
  subject3_endsem FLOAT,
  subject4_midsem FLOAT,
  subject4_endsem FLOAT
);
