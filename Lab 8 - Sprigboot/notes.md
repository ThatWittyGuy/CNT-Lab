# EXPANDED NOTES + DETAILED EXPLANATION + 30 VIVA QUESTIONS & ANSWERS  
**Assignment No: 8 – Design and Develop a Responsive Semester Result Website for VIT Students using Spring Boot + React + MySQL**

### 1. BIG-PICTURE ARCHITECTURE (What you actually built)

```
Frontend (React)          Backend (Spring Boot)          Database (MySQL)
   Port: 3000      <--->      Port: 8080          <--->      Port: 3306
   (Create React App)         REST APIs                 studentdb
   - Form to enter marks      - @RestController        CREATE TABLE student_result (...)
   - Show certificate         - JPA Entity
   - Calls /api/results/*     - JpaRepository
                              - Calculates CGPA
```

This is a **full-stack MERN-like but with Java backend** (REACT + SPRING BOOT + MYSQL).

### 2. DETAILED COMPONENT-WISE EXPLANATION

| Layer          | File / Class                         | Purpose & Key Points                                                                                   |
|----------------|--------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Spring Boot Main** | `VitresultApplication.java`          | @SpringBootApplication → entry point, auto-configures everything                                      |
| **Entity**       | `StudentResult.java`                 | @Entity → maps to table student_result<br>getTotalMarks() & getCgpa() → business logic in entity     |
| **Repository**   | `StudentRepository.java`             | Extends JpaRepository → gives CRUD methods for free (save, findAll, findById etc.)                    |
| **Controller**   | `ResultController.java`              | @RestController + @CrossOrigin → exposes REST APIs<br>/api/results/add (POST)<br>/api/results/all (GET)|
| **Configuration**| `application.properties`             | DB URL, username, password<br>hibernate.ddl-auto=update → auto creates/updates table<br>server.port   |
| **Frontend**     | React App (src/App.js, Certificate.js) | Form → POST to http://localhost:8080/api/results/add<br>Fetch all → GET /api/results/all<br>Shows printable certificate |
| **Database**     | MySQL → studentdb                    | Table created automatically because of ddl-auto=update                                                |

### 3. MARKS CALCULATION LOGIC (MOST IMPORTANT FOR VIVA)

Each subject total = (MSE × 0.3) + (ESE × 0.7)  
Maximum marks per subject = 100  
Four subjects → Maximum total = 400  

**CGPA Formula used in project:**
```
CGPA = (Total marks obtained out of 400) × 10 / 400
     = (Total / 400) × 10
     = Total / 40
```
So CGPA 10.00 → 400/400 marks  
CGPA 8.50 → 340/400 marks etc.

### 4. WHY THIS TECH STACK WAS CHOSEN

| Technology     | Reason                                                                                     |
|----------------|--------------------------------------------------------------------------------------------|
| Spring Boot    | Zero configuration, embedded Tomcat, easy REST API, excellent JPA support                 |
| Spring Data JPA| No need to write SQL for CRUD → just extend JpaRepository                                 |
| MySQL          | Relational, ACID compliant, perfect for structured student data                           |
| React          | Component-based UI, easy to make responsive + printable certificate                      |
| Thymeleaf (optional) | If you want server-side rendering (not used here because React is client)             |
| @CrossOrigin   | Allows React (3000) to call Spring Boot (8080) without CORS errors                         |

### 5. STEP-BY-STEP FLOW WHEN USER SUBMITS MARKS

1. User fills form in React → clicks Submit  
2. React does fetch('/api/results/add', POST, JSON)  
3. Spring Boot @PostMapping("/add") receives @RequestBody StudentResult  
4. repo.save() → INSERT into MySQL table  
5. Returns saved object → React shows success  
6. React fetches /api/results/all → displays list or generates certificate

### 30 HIGH-QUALITY VIVA QUESTIONS & ANSWERS (Perfect for University External Viva)

| Q.No | Question                                                                                         | Answer (Precise & Impressive) |
|------|--------------------------------------------------------------------------------------------------|-------------------------------|
| 1    | What is Spring Boot? Why not plain Spring?                                                       | Spring Boot = Spring + Auto-configuration + Embedded server + Starter dependencies → reduces 90% boilerplate |
| 2    | What does @SpringBootApplication annotation do internally?                                       | It is meta-annotation of @Configuration + @EnableAutoConfiguration + @ComponentScan |
| 3    | What is the use of spring-boot-starter-web dependency?                                           | Brings Tomcat + Spring MVC + Jackson → needed for REST APIs |
| 4    | Difference between @RestController and @Controller?                                              | @RestController = @Controller + @ResponseBody on every method → returns JSON directly |
| 5    | Why did you use @CrossOrigin(origins = "http://localhost:3000")?                                 | To allow React app running on port 3000 to call Spring Boot APIs without CORS block |
| 6    | What is JPA? Explain JpaRepository.                                                              | Java Persistence API. JpaRepository<T,ID> provides ready methods: save(), findAll(), findById(), delete() etc. |
| 7    | What does spring.jpa.hibernate.ddl-auto=update do?                                               | Automatically creates/alters tables based on @Entity classes (great for development) |
| 8    | How is the CGPA calculated in your project?                                                      | Total = Σ(MSE×0.3 + ESE×0.7) for 4 subjects → CGPA = (Total/400)×10 |
| 9    | Why did you put business logic (getTotalMarks, getCgpa) inside Entity?                           | Clean, reusable, calculated fields available wherever entity is used |
| 10   | What is the use of @GeneratedValue(strategy = GenerationType.IDENTITY)?                         | Auto-increment primary key using database IDENTITY column (MySQL AUTO_INCREMENT) |
| 11   | How does React communicate with Spring Boot?                                                     | Using fetch() or axios → JSON over HTTP REST APIs |
| 12   | What will happen if you remove @Entity annotation from StudentResult class?                      | Hibernate will not map it to any table → runtime error |
| 13   | What is the default port of Spring Boot embedded Tomcat?                                         | 8080 |
| 15   | How can you change the port?                                                                     | server.port=9090 in application.properties |
| 16   | What is the purpose of pom.xml in this project?                                                  | Maven build file – manages dependencies & plugins |
| 17   | Name any three Spring Boot Starter dependencies you used.                                        | spring-boot-starter-web, spring-boot-starter-data-jpa, spring-boot-starter-thymeleaf |
| 18   | What is @Autowired? How does it work?                                                            | Field injection – Spring injects the bean automatically using reflection |
| 19   | Difference between @Component, @Service, @Repository                                             | All are stereotypes. @Repository adds translation of DB exceptions, @Service for business layer |
| 20   | Why MySQL instead of MongoDB for this project?                                                   | Marks data is highly structured & relational (fixed columns) → relational DB is natural choice |
| 21   | How will you make this application production ready?                                             | Change ddl-auto=none, use external DB, add HTTPS, logging, exception handling, validation |
| 22   | What is the use of @Id annotation?                                                               | Marks primary key field                                    | Marks primary key field |
| 23   | Explain the flow when http://localhost:8080/api/results/all is called.                           | GET → ResultController.getAll() → repo.findAll() → Jackson serializes List<StudentResult> → JSON response |
| 24   | What is Jackson?                                                                                 | Default JSON processor in Spring Boot (converts Java ↔ JSON) |
| 25   | How can you add input validation (e.g., marks between 0-30 for MSE)?                             | Use @Valid + Bean Validation annotations (@Max(30), @Min(0)) on entity fields |
| 26   | What is the significance of mysql-connector-j dependency?                                        | Provides JDBC driver to connect Java application with MySQL server |
| 27   | If you want to support Oracle instead of MySQL, what changes are required?                      | Change mysql-connector-j → ojdbc, change driver class & URL in application.properties |
| 28   | How to enable hot-reload during development?                                                     | Add spring-boot-devtools dependency → automatic restart on code change |
| 29   | Why did you use POST for adding result and GET for fetching?                                     | POST → creates resource (idempotent safe), GET → safe & cacheable |
| 30   | How will you deploy this full application (React + Spring Boot) on a single server?             | Build React → static files in src/main/resources/static → Spring Boot serves both API + UI from port 8080 |

### BONUS QUICK CONCEPT QUESTIONS (Usually asked in 1-mark)

| Question                                      | One-line Answer                                      |
|-----------------------------------------------|------------------------------------------------------|
| What is REST API?                             | Architectural style using HTTP verbs for CRUD        |
| What is embedded server in Spring Boot?       | Tomcat/Jetty/Netty running inside JAR, no external server needed |
| What is the use of @RequestBody?              | Deserializes JSON body into Java object              |
| What is H2 database?                          | In-memory DB often used for testing                  |
| What is Thymeleaf?                            | Server-side Java template engine                     |

Use these notes + 30 Q&A → you will confidently face any university viva or interview on this assignment.

All the best! 🚀