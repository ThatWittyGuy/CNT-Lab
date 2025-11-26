Here is the complete **30 Viva Questions and Answers** in normal readable format with **(non-tabular)**, with **detailed, natural, and slightly longer answers** – exactly the way you should speak in your university viva. These answers are perfect for scoring full marks in external examination.

### 30 Viva Questions & Answers (Normal Detailed Format)

**Q1. What is Spring Boot and why did you choose it for this assignment?**  
Answer: Spring Boot is a framework built on top of Spring that makes it very easy and fast to create production-ready applications. The main reasons we chose Spring Boot are:  
- It removes almost all boilerplate configuration using auto-configuration  
- It comes with an embedded Tomcat server (Tomcat) embedded inside the JAR, so we don’t need to install external servers like Tomcat or GlassFish  
- It provides starter dependencies that bring all required libraries in one go  
- Perfect for building REST APIs quickly, which was required to communicate with React frontend  
- Huge community support and used by companies like Amazon, Google, Netflix etc.

**Q2. Explain the meaning of @SpringBootApplication annotation.**  
Answer: @SpringBootApplication is the most important annotation and is placed on the main class. It is actually a combination of three annotations:  
1. @Configuration – marks the class as a source of bean definitions  
2. @EnableAutoConfiguration – tells Spring Boot to automatically configure beans based on dependencies  
3. @ComponentScan – scans the current package and sub-packages for @Component, @Service, @Repository, @Controller etc.  
So with just one annotation, our entire application becomes ready to run.

**Q3. What is the difference between @Controller and @RestController?**  
Answer: @Controller is used for traditional Spring MVC applications where methods return view names (like "index.html").  
@RestController is specially designed for REST APIs. It is @Controller + @ResponseBody combined. This means every method automatically returns data (JSON/XML) directly to the client instead of looking for a view. Since we are sending JSON to React, @RestController is perfect.

**Q4. Why did you add @CrossOrigin(origins = "http://localhost:3000") in the controller?**  
Answer: Because our React runs on port 3000 and Spring Boot runs on port 8080, they are on different origins. Browsers block such cross-origin requests due to security policy (CORS). By adding @CrossOrigin, we explicitly allow requests only from localhost:3000, so React can successfully call our backend APIs without getting rid of the CORS error.

**Q5. What is JPA and what is the role of JpaRepository?**  
Answer: JPA stands for Java Persistence API – it is a specification for ORM (Object Relational Mapping).  
JpaRepository is an interface provided by Spring Data JPA. When we extend it like JpaRepository<StudentResult, Long>, we instantly get more than 18 methods for free such as save(), findAll(), findById(), deleteById(), count() etc. without writing any SQL or implementation. It saves huge amount of time.

**Q6. What does spring.jpa.hibernate.ddl-auto=update do in application.properties?**  
Answer: This property controls how Hibernate manages database schema:  
- create → drops and recreates tables every time  
- create-drop → same but drops at shutdown  
- update → safest for development – it creates table if not exists, and alters table (adds new columns) if entity changes  
- validate → only checks, no change  
- none → does nothing (used in production)  
We used update so that whenever we modify StudentResult.java, table structure updates automatically.

**Q7. How is CGPA calculated in your project? Explain the formula clearly.**  
Answer: In VIT pattern:  
MSE = 30% weightage, ESE = 70% weightage  
For each subject: Total = (MSE × 0.3) + (ESE × 0.7)  
Four subjects → maximum total marks = 400  
CGPA is on 10-point scale, so formula becomes:  
CGPA = (Total marks obtained / 400) × 10  
Which is same as CGPA = Total marks / 40  
Example: If student scores total 340 out of 400 → CGPA = 340/40 = 8.5

**Q8. Why did you keep getTotalMarks() and getCgpa() methods inside the Entity class?**  
Answer: We kept calculation logic inside the entity because:  
- It keeps the logic at one place (reusability)  
- Whenever we fetch the object from database, these values are readily available  
- It follows object-oriented principle – data and behavior that belongs to it should stay together  
- Frontend can directly display result.cgpa without calculating again

**Q9. What is the use of @GeneratedValue(strategy = GenerationType.IDENTITY)?**  
Answer: This tells Hibernate how to generate primary key values.  
IDENTITY strategy uses database’s own auto-increment feature (MySQL AUTO_INCREMENT).  
When we save a new StudentResult, we don’t pass id – database automatically assigns 1, 2, 3…  
This is the simplest and most commonly used strategy with MySQL.

**Q10. How does the React frontend communicate with Spring Boot backend?**  
Answer: React uses fetch() or axios to make HTTP requests:  
- To save marks → fetch("http://localhost:8080/api/results/add", {method: 'POST', body: JSON})  
- To get all results → fetch("http://localhost:8080/api/results/all")  
Spring Boot receives JSON → converts to StudentResult object using Jackson → saves to DB → returns JSON response → React displays it.

**Q11. What happens if you remove @Entity annotation from StudentResult class?**  
Answer: Hibernate will not recognize StudentResult as a database table. When application starts, it will throw exception: "Unknown entity: com.example.vitresult.model.StudentResult". No table will be created and repo.save() will fail.

**Q12. What is the default port of Spring Boot application? How to change it?**  
Answer: Default port is 8080.  
We can change it by adding this line in application.properties:  
server.port=9090 or any port we want.

**Q13. Explain the role of pom.xml in your project.**  
Answer: pom.xml is the heart of Maven project. It contains:  
- Project coordinates (groupId, artifactId, version)  
- Parent → spring-boot-starter-parent (inherits default configurations)  
- Dependencies → all libraries (web, jpa, mysql, thymeleaf, devtools)  
- Build plugins → spring-boot-maven-plugin to create executable JAR

**Q14. What is @Autowired? How does Spring know which object to inject?**  
Answer: @Autowired tells Spring to automatically inject a dependent bean.  
Spring looks into its container – finds only one bean of type StudentRepository (because we have interface extending JpaRepository) → injects the proxy object. It works by type matching.

**Q15. Why did you choose MySQL instead of MongoDB for student results?**  
Answer: Student result data is highly structured – fixed number of subjects, fixed marks columns, strong relationships, and we need accurate calculations. Relational databases like MySQL guarantee ACID properties and are perfect for such structured data. MongoDB (NoSQL) is better when data is unstructured or schema keeps changing.

**Q16. How will you make this application production ready?**  
Answer: In production we will:  
- Set spring.jpa.hibernate.ddl-auto=none  
- Use strong database credentials  
- Add @Valid and Bean Validation (@Min, @Max, @NotBlank)  
- Add global exception handling  
- Enable HTTPS  
- Use logging (SLF4J + Logback)  
- Deploy as JAR on cloud (AWS, Azure, Railway)  
- Put React build inside src/main/resources/static so single JAR serves everything

**Q17. What is the use of mysql-connector-j dependency?**  
Answer: It is the official JDBC driver for MySQL. Without this, Spring Boot cannot connect to MySQL database. It provides classes like com.mysql.cj.jdbc.Driver that establish connection using the URL jdbc:mysql://localhost:3306/studentdb

**Q18. If you want to switch from MySQL to Oracle, what changes are required?**  
Answer: Only three changes:  
1. Replace mysql-connector-j with ojdbc (Oracle driver)  
2. Change spring.datasource.url = jdbc:oracle:thin:@localhost:1521:xe  
3. Change dialect → org.hibernate.dialect.OracleDialect  
Everything else (username/password as per Oracle setup)

**Q19. What is the use of spring-boot-devtools?**  
Answer: It enables developer-friendly features:  
- Automatic restart when code changes  
- LiveReload – browser refreshes automatically  
- Remote debugging support  
Very useful during development – we added it as optional dependency.

**Q20. Why did you use POST for adding result and GET for fetching all results?**  
Answer: Because:  
- POST → creates a new resource (non-idempotent, safe for data insertion)  
- GET → only reads data (idempotent, cacheable, safe to call multiple times)  
This follows correct REST principles.

**Q21. What is Jackson in Spring Boot?**  
Answer: Jackson is the default JSON processing library. When we return a Java object from @RestController, Jackson automatically converts (serializes) it to JSON. When @RequestBody is used, Jackson converts incoming JSON to Java object (deserialization).

**Q22. How can you add validation so that MSE marks cannot be more than 30?**  
Answer: Add Bean Validation annotations on entity fields:  
@Max(value = 30, message = "MSE cannot exceed 30")  
@Min(value = 0)  
private double mse1;  
Then use @Valid in controller method – Spring will automatically validate before saving.

**Q23. What is REST API?**  
Answer: REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations. Resources are identified by URLs, and data is transferred in JSON/XML format.

**Q24. What is an embedded server? Name the one used by Spring Boot by default.**  
Answer: Embedded server means the web server (Tomcat, Jetty or Undertow) runs inside the same JVM process as our application. No need to deploy WAR file separately. Spring Boot uses embedded Tomcat by default.

**Q25. What is Thymeleaf? Did you use it in this project?**  
Answer: Thymeleaf is a server-side Java template engine for rendering HTML. We added the dependency but did not use it because we chose React as frontend. If we wanted server-side rendering, we would have used Thymeleaf templates instead of React.

**Q26. How will you deploy both React and Spring Boot together as a single application?**  
Answer: Very common production approach:  
1. Run npm run build in React folder → generates static files in build/  
2. Copy all files from React build/ → src/main/resources/static in Spring Boot  
3. Now Spring Boot serves React files from http://localhost:8080/ and APIs from /api/...  
Single JAR/WAR file contains both frontend and runs on single port.

**Q27. What is @RequestBody and @ResponseBody?**  
Answer: @RequestBody → tells Spring to convert incoming JSON/XML request body into Java object  
@ResponseBody → tells Spring to convert return value of method directly into HTTP response body (JSON)  
@RestController automatically applies @ResponseBody on all methods.

**Q28. What is the use of application.properties file?**  
Answer: It is the central place to configure:  
- Server port  
- Database URL, username, password  
- Hibernate settings  
- Logging levels  
- Custom properties  
Spring Boot reads it at startup and applies all configurations.

**Q29. Can we use MongoDB instead of MySQL in the same project?**  
Answer: Yes, just replace:  
- spring-boot-starter-data-jpa → spring-boot-starter-data-mongodb  
- MySQL driver → mongodb-driver  
- Change entity annotations slightly  
- Change repository to MongoRepository  
But for fixed schema like marks, MySQL is still better choice.

**Q30. Explain the complete flow when a student submits marks from the React form.**  
Answer:  
1. Student fills name and marks → clicks Submit  
2. React packs data into JSON → sends POST request to http://localhost:8080/api/results/add  
3. Spring Boot receives request → @RequestBody converts JSON → StudentResult object  
4. @Autowired StudentRepository repo → repo.save(result) → INSERT query executed  
5. Saved object returned as JSON  
6. React receives response → shows success message or redirects to certificate page  
7. Certificate component calculates totals and displays printable result with CGPA.

All the best for your viva! You will definitely score excellent marks with these answers.