1. **Q: Can you give an overview of your project? What is its main purpose?**  
   **A:** My project is a Semester Result Calculator and Certificate Generator for college students, specifically tailored for institutions like Vishwakarma Institute of Technology (VIT). The main purpose is to allow students to input their midterm (midsem) and end-semester (endsem) marks for four subjects, calculate weighted percentages per subject (30% midsem + 70% endsem, normalized from marks out of 50 to 100), compute the average percentage, and derive the CGPA (average percentage / 10). It saves the results to a MySQL database for persistence and generates a downloadable PDF certificate with a styled layout including the student's name, subject scores, average, and CGPA. The project evolved from a simple PHP backend to a more robust Spring Boot backend, with a React frontend for the user interface. It handles validation, previews with progress bars and tables, and ensures data integrity through backend calculations.

2. **Q: What technologies did you use in this project, and why?**  
   **A:** The tech stack includes: Frontend - React.js (v19.1.1) with Vite for fast development and building, html2canvas and jsPDF for PDF generation; Backend - PHP (prototype) with PDO for DB interactions, and Spring Boot (v3.5.6) with Java 17, Spring Data JPA, and Hibernate for a more enterprise-level API; Database - MySQL for storing results. I chose React for its component-based UI and state management, making it easy to handle forms and dynamic previews. Spring Boot was selected for its auto-configuration, embedded server, and robust handling of REST APIs and transactions, improving over PHP's simplicity. MySQL was used for its relational structure, ease of integration with both backends, and support for auto-increment IDs and timestamps. Tools like Maven (for Spring) and npm (for React) handle dependencies.

3. **Q: Explain the architecture of your project.**  
   **A:** The architecture is a client-server model with a React frontend as the client, a backend API (PHP or Spring Boot) as the server, and MySQL as the database. The frontend is a single-page application (SPA) where users input data via forms, perform local validations and previews, and send POST requests to the backend API (e.g., /api/results) to save data. The backend receives JSON payloads, performs weighted calculations to ensure accuracy, inserts records into the MySQL table "results", and returns a response with computed values. For PDF generation, the frontend uses html2canvas to capture a hidden styled DIV as an image and jsPDF to create and download the PDF. Data flow is asynchronous with fetch API calls, and CORS is enabled for development. The system supports GET requests to fetch saved results, making it extensible for admin views.

4. **Q: How does the calculation logic work in your project?**  
   **A:** The calculation is based on weighted averages: Each subject's score is computed as (midsem_marks / 50 * 30) + (endsem_marks / 50 * 70), resulting in a percentage out of 100. This is done both on the frontend (for instant preview) and backend (for accuracy and storage). The average percentage is the mean of the four subject percentages, and CGPA is average / 10, rounded to two decimals. In Spring Boot's ResultService.java, the weighted() method handles this: `return (mid / 50.0) * 30.0 + (end / 50.0) * 70.0;`. Results are rounded using `Math.round(v * 100.0) / 100.0`. This ensures consistency, as frontend mirrors the logic in the calculate() function in App.jsx.

5. **Q: What are the key features of your application?**  
   **A:** Key features include: 1) Form input for student name and marks (0-50 validation); 2) Real-time local preview with progress bars for subject percentages, a table for detailed marks/avg/CGPA; 3) Backend saving with recalculations for data integrity; 4) PDF certificate generation with custom styling (badge, table, stats); 5) Fetching saved results via API; 6) Responsive design using CSS media queries; 7) Error handling for invalid inputs or API failures. The certificate is hidden on-screen but captured for PDF, ensuring clean UI.

6. **Q: Describe the MySQL database schema used in your project.**  
   **A:** The database is named "college_results" (PHP) or "college_results_spring" (Spring Boot). The main table is "results" with columns: id (INT AUTO_INCREMENT PRIMARY KEY), student_name (VARCHAR(100)), subject1_midsem to subject4_endsem (FLOAT or Integer, storing raw marks out of 50), avg_percentage (FLOAT, computed average), cgpa (FLOAT, computed CGPA), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP). In Spring Boot, this is mapped via JPA in ResultEntity.java with @Column annotations. The schema uses UTF-8 charset for compatibility. No complex relationships; it's a flat table for simplicity.

7. **Q: How do you connect to the MySQL database in the PHP backend?**  
   **A:** In config.php, I use PDO for connection: `$conn = new PDO("mysql:host=localhost;dbname=college_results;charset=utf8", "root", "mysql@password123"); $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`. This sets up a secure, exception-handling connection with UTF-8 to prevent encoding issues. It's included in save_results.php and get_results.php for queries.

8. **Q: Explain how data is inserted into the database in Spring Boot.**  
   **A:** In ResultService.java, the save() method is @Transactional. It calculates weighted scores, creates a ResultEntity object, sets all fields (raw marks, avg, cgpa), and calls repo.save(entity) where repo is JpaRepository. Hibernate handles the INSERT SQL automatically. The method returns a ResultResponse DTO with computed values. Connection details are in application.properties: JDBC URL with port 3307, username/password.

9. **Q: What is the purpose of the created_at column in the database?**  
   **A:** The created_at TIMESTAMP column automatically records the insertion time (DEFAULT CURRENT_TIMESTAMP). It's useful for auditing, sorting results chronologically, or generating reports on when results were saved. In Spring Boot, it's set via LocalDateTime.now() in the entity.

10. **Q: How do you handle database errors in the backends?**  
    **A:** In PHP, PDO exceptions are caught: `catch(PDOException $e) { http_response_code(500); echo json_encode(["error" => "Database error: " . $e->getMessage()]); }`. In Spring Boot, JPA throws exceptions handled by Spring's error mechanisms, returning 500 responses. Frontend catches fetch errors and shows messages like "Network error".

11. **Q: Explain the save_results.php file in detail.**  
    **A:** This PHP script handles POST requests. It sets CORS headers, includes config.php for DB connection, decodes JSON input, extracts and sanitizes data (floatval for marks), prepares an INSERT statement with placeholders for security, executes with bound values, and returns JSON success or error. It doesn't perform calculations—assumes frontend does—but stores raw marks.

12. **Q: What is the role of get_results.php?**  
    **A:** It's a GET endpoint that fetches all records: Prepares "SELECT * FROM results", executes, fetches as assoc array, and echoes JSON. Used for displaying saved results in the frontend table.

13. **Q: How does the PHP backend differ from Spring Boot?**  
    **A:** PHP is procedural, uses raw SQL with PDO, no calculations on server, simpler for prototypes. Spring Boot is object-oriented, uses JPA for ORM (no raw SQL), performs calculations in service layer, supports transactions, and is better for scalability with features like dependency injection and auto-config.

14. **Q: Describe the config.php file.**  
    **A:** It defines DB credentials (host, dbname, username, password) and creates a PDO connection with charset=utf8 and error mode=exception. If connection fails, it dies with the error message.

15. **Q: Why use PDO in PHP instead of mysqli?**  
    **A:** PDO supports multiple databases, prepared statements for security, and exception handling. It's more modern and flexible than mysqli, which is MySQL-specific.

16. **Q: Explain ResultService.java in Spring Boot.**  
    **A:** This service class injects ResultRepository, has a weighted() method for per-subject calc, and save() method: Computes s1-s4, avg, cgpa; creates/sets entity; saves via repo; returns DTO. Uses @Transactional for atomicity and round2() for precision.

17. **Q: What is ResultController.java?**  
    **A:** Annotated @RestController, maps /api/results. @PostMapping handles create() with @RequestBody, calls service.save(). @GetMapping for list() and getById(). Enables @CrossOrigin(*) for dev.

18. **Q: How does Spring Boot handle DB schema creation?**  
    **A:** Via spring.jpa.hibernate.ddl-auto=update in properties, Hibernate auto-creates/updates tables based on entities. Shows SQL with show-sql=true.

19. **Q: Explain ResultEntity.java.**  
    **A:** JPA entity mapping to "results" table. Uses @Id @GeneratedValue for id, @Column for each field, LocalDateTime for created_at initialized to now().

20. **Q: What are DTOs in your Spring Boot backend?**  
    **A:** Data Transfer Objects: ResultRequest for input (student_name, subX_mid/end as Integer), ResultResponse for output (id, sub1-4 as double percentages, avg_percentage, cgpa). They decouple API from entity, allowing custom formats.

21. **Q: Explain the main component App.jsx in React.**  
    **A:** Uses useState for formData, preview, error, savedId. handleChange updates inputs. validateMarks checks 0-50. calculate() mirrors backend logic for local preview. handleSubmit validates, computes preview, fetches to API, sets savedId. downloadPdf uses html2canvas on #certificate DIV, adds to jsPDF, saves file. Renders form, buttons, progress bars, table, hidden certificate.

22. **Q: How do you generate the PDF certificate?**  
    **A:** A hidden DIV (#certificate) has styled content (badge, name, table, stats). On button click, html2canvas captures it as PNG, jsPDF creates A4 doc, adds image, saves as PDF. Print CSS ensures visibility during capture.

23. **Q: What styling is used in the frontend?**  
    **A:** index.css defines classes: .container for layout, .progress-bar for bars (gradient backgrounds), .certificate for PDF (borders, flex). Responsive with @media (max-width:860px) to stack elements. Uses flex/grid for alignment.

24. **Q: How do you handle API calls in React?**  
    **A:** Using fetch in handleSubmit: POST to 'http://localhost:8080/api/results' with JSON body. Async/await for response, json() for data. Catches errors for display.

25. **Q: Explain the use of html2canvas and jsPDF.**  
    **A:** html2canvas renders DOM element to canvas image. jsPDF creates PDF, adds image at full A4 size (210x297mm), saves with filename. Installed via npm.

26. **Q: How do you run the entire project?**  
    **A:** Start XAMPP (Apache/MySQL on 3307). Create DB/table via phpMyAdmin. For Spring: cd result-service, ./mvnw spring-boot:run (port 8080). For React: cd college-frontend, npm install, npm run dev (port 5173). Access localhost:5173.

27. **Q: What configurations are in vite.config.js and eslint.config.js?**  
    **A:** vite.config.js: defineConfig with @vitejs/plugin-react for React support. eslint.config.js: Extends js.recommended, react-hooks, react-refresh; globals for browser; rules like no-unused-vars ignore patterns.

28. **Q: How do you handle errors and validations?**  
    **A:** Frontend: Check 0-50 in validateMarks, setError state. Backend: Exceptions return 500 JSON. No input sanitization beyond types; add in production.

29. **Q: What improvements can you suggest for this project?**  
    **A:** Add user authentication (JWT), pagination for results, email PDF, unit tests (Jest for React, JUnit for Spring), deploy to cloud (Heroku/AWS), input validation on backend, multi-semester support.

30. **Q: What edge cases did you consider?**  
    **A:** Invalid marks (below 0/above 50—alert), empty name (required), API failures (network error message), zero marks (CGPA 0), max marks (CGPA 10), DB connection fails (error response), responsive on mobile, large inputs (but limited to 50).