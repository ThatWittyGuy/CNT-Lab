Here is the **complete, ready-to-use, high-scoring VIVA material** for **Assignment No: 9 – Online Book Store using React + Node.js + Express + MySQL** in a clean, normal paragraph format with detailed, confident, slightly longer answers — perfect for university external viva.

### 30 Most Important Viva Questions & Answers (Detailed – Normal Format)

**Q1. What is Node.js? Why is it called a runtime environment and not a framework?**  
Answer: Node.js is an open-source, cross-platform JavaScript runtime environment that allows us to execute JavaScript code outside the browser — on the server side. It is built on Chrome’s V8 JavaScript engine. It is not a framework like Express, but a runtime that provides the environment (event loop, libuv, file system access, network modules etc.) so that enables JavaScript to work as a server-side language. That’s why we can build full backend applications using only JavaScript.

**Q2. Explain the event-driven and non-blocking I/O model of Node.js with diagram explanation.**  
Answer: Node.js works on a single-threaded event loop model using non-blocking I/O. When a request comes (e.g., reading a file or querying database), Node.js does not wait (block) for the operation to complete. Instead, it registers a callback and moves on to serve other requests. When the I/O operation finishes, the callback is pushed to the event queue. The event loop continuously checks the queue and executes the callbacks. This allows one single thread to handle thousands of concurrent connections very efficiently — perfect for web applications.

**Q3. Why is Node.js considered fast and scalable?**  
Answer: Node.js is fast because:  
- It uses Google’s V8 engine which compiles JavaScript directly to native machine code  
- Non-blocking I/O avoids waiting  
- Event loop runs in a single thread so there is no context switching overhead  
- It can handle thousands of concurrent connections with low memory  
Companies like Netflix, LinkedIn, Uber, PayPal use Node.js because of this scalability.

**Q4. What is npm? Explain package.json file in detail.**  
Answer: npm (Node Package Manager) is the world’s largest software registry and the default package manager for Node.js. The package.json file is the heart of any Node.js project. It contains:  
- Project metadata (name, version, description, author)  
- Entry point (main: "server.js")  
- Scripts (start, test, build etc.)  
- List of dependencies and devDependencies  
Without package.json, we cannot run npm install or manage versions properly.

**Q5. What is Express.js? Why did you use it in this project?**  
Answer: Express.js is a minimal and flexible web application framework for Node.js. It simplifies the process of building REST APIs and handling HTTP requests. We used Express because it provides routing, middleware support, easy JSON parsing, CORS handling, and makes our code clean and organized compared to using only the core http module.

**Q6. What is the purpose of cors() middleware in your backend?**  
Answer: Since our React frontend runs on http://localhost:3000 and Node.js backend on http://localhost:5000, they are on different origins. Browsers block such cross-origin requests by default for security (CORS policy). The cors() middleware adds the necessary headers (Access-Control-Allow-Origin: *) so that our React app can successfully call the Node.js APIs without getting blocked.

**Q7. Explain how password is stored securely in your project.**  
Answer: We never store plain text passwords. When user registers, we use bcryptjs to hash the password:  
const hashedPassword = bcrypt.hashSync(password, 8);  
This creates a one-way encrypted hash using salt. When user logs in, we use bcrypt.compareSync(enteredPassword, storedHash) to verify. Even if database is compromised, attacker cannot get original password.

**Q8. What is JWT? How does authentication work in your book store?**  
Answer: JWT stands for JSON Web Token. It is a compact, URL-safe token used for authentication. Flow in our project:  
1. User logs in with email & password  
2. Server validates credentials → creates JWT.sign({id: user.id}, secretKey, {expiresIn: '1h'})  
3. Token is sent back and stored in localStorage  
4. For protected routes (like viewing catalogue after login), we send token in Authorization header  
5. Server verifies token using JWT.verify() before giving access  
This is stateless authentication — no sessions stored on server.

**Q9. Why did you use mysql2 instead of mysql package?**  
Answer: mysql2 is the newer, actively maintained, and more feature-rich driver. It supports Promises, prepared statements, connection pooling, and better performance. It is the recommended package recommended in 2024–2025 for new projects.

**Q10. Explain the folder structure of your backend.**  
Answer: We followed clean architecture:  
backend/  
├── index.js or server.js → main entry point  
├── db.js → database connection  
├── routes/ → auth.js, books.js (all routes)  
├── controllers/ → business logic (optional separation)  
├── .env → secret keys  
├── node_modules/ & package.json  
This makes code maintainable and scalable.

**Q11. What is the use of dotenv package?**  
Answer: We store sensitive information like database password, JWT secret, port number in .env file. The dotenv package loads these variables into process.env at runtime so we never hardcode secrets in our code. This is a security best practice.

**Q12. How do you connect Node.js with MySQL in this project?**  
Answer: In db.js we created a connection using mysql2:  
const db = mysql.createConnection({ host, user, password, database, port })  
Then db.connect() to test connection. We export this db object and use db.query() everywhere. All database credentials are taken from .env file.

**Q13. What happens when user clicks Login button? Explain complete flow.**  
Answer:  
1. React collects email & password  
2. axios.post("http://localhost:5000/api/auth/login", {email, password})  
3. Node.js receives request → finds user by email  
4. Compares password using bcrypt.compareSync()  
5. If valid → creates JWT token → sends back token + user info  
6. React saves token in localStorage  
7. Redirects to /catalogue page  
8. Catalogue page shows list of books

**Q14. How are books displayed on the Catalogue page?**  
Answer: When Catalogue component mounts, useEffect() runs → axios.get("http://localhost:5000/api/books") → Node.js executes SELECT * FROM books → returns JSON array → React sets state using setBooks() → maps over array and displays each book in a card with title, author and price.

**Q15. What is the difference between npm install and npm install --save-dev?**  
Answer: npm install package → adds to dependencies (needed in production)  
npm install package --save-dev or -D → adds to devDependencies (only needed during development, e.g., nodemon, eslint)

**Q16. What is nodemon and why do we use it?**  
Answer: nodemon is a development tool that automatically restarts the Node.js server whenever we save a file. Without nodemon, we have to manually stop and start server after every change. We run npm run dev or nodemon server.js for auto-restart.

**Q17. What is the purpose of body-parser middleware?**  
Answer: body-parser parses incoming request bodies in JSON format. In newer Express versions (>4.16), we can use express.json() instead. In our code we used express.json() which does the same thing — so req.body becomes available.

**Q18. How can you protect routes so that only logged-in users can access catalogue?**  
Answer: We create a middleware:  
function authenticateToken(req, res, next) {  
  const token = req.headers['authorization'];  
  if (!token) return res.sendStatus(401);  
  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {  
    if (err) return res.sendStatus(403);  
    req.user = user;  
    next();  
  });  
}  
Then use app.use('/api/books', authenticateToken, bookRoutes);

**Q19. What is localStorage in browser? Why did you use it to store JWT?**  
Answer: localStorage is client-side storage in browser that persists even after closing tab. We store JWT there because:  
- It survives page refresh  
- Easy to access using localStorage.getItem("token")  
- Sent automatically with every request using Axios interceptors  
Alternative: sessionStorage (clears on tab close) or HttpOnly cookies (more secure).

**Q20. What is Axios? Why not use fetch()?**  
Answer: Axios is a promise-based HTTP client. We used it because:  
- Automatic JSON parsing  
- Better error handling  
- Request/response interceptors  
- Timeout support  
- Works same in browser and Node.js  
But fetch() is also perfectly fine.

**Q21. Explain useState and useEffect hooks used in your React components.**  
Answer: useState → to manage component state (form inputs, books list, messages)  
useEffect → to perform side effects (API calls). In Catalogue.js, useEffect(() => { fetchBooks() }, []) runs only once when component mounts — perfect for loading books from backend.

**Q22. What is React Router? How did you implement navigation?**  
Answer: React Router (react-router-dom) enables client-side routing in single-page applications. We used BrowserRouter, Routes, Route, Link, and useNavigate() hook to navigate between Home, Login, Register, and Catalogue pages without full page reload.

**Q23. How will you add "Add to Cart" functionality later?**  
Answer: We would:  
1. Create new table cart (userId, bookId, quantity)  
2. Create POST /api/cart/add route  
3. Store cart in database linked to logged-in user  
4. Show cart icon with count  
5. Create Cart page to display items

**Q24. How to deploy this full-stack app in production?**  
Answer:  
1. Build React app → npm run build  
2. Copy build folder contents → backend/public  
3. In Express: app.use(express.static('public')) and app.get('*', (req,res) => res.sendFile(path.join(__dirname,'public','index.html')))  
4. Now single Node.js server serves both API and frontend  
5. Deploy on Render, Railway, Vercel (backend), or AWS

**Q25. What is the difference between require() and import in Node.js?**  
Answer: require() is CommonJS (older) → used in our project  
import is ES6 module syntax (modern)  
To use import, we need "type": "module" in package.json  
Both work, but most Node.js projects still use require().

**Q26. What is middleware in Express? Give example from your code.**  
Answer: Middleware are functions that have access to req, res, and next().  
Examples in our code:  
- app.use(cors())  
- app.use(express.json())  
- We can create custom middleware for authentication, logging, validation etc.

**Q27. Why did you use port 5000 for backend and 3000 for frontend?**  
Answer: Create React App runs on port 3000 by default. We chose 5000 for Node.js to avoid conflict. In production, both can run on same port (usually 80 or 443).

**Q28. How to prevent SQL injection in this project?**  
Answer: We used parameterized queries:  
db.query('SELECT * FROM users WHERE email = ?', [email], ...)  
The ? placeholder prevents SQL injection even if user enters malicious input.

**Q29. What is bcrypt and why salt is used?**  
Answer: bcrypt is a password-hashing function. Salt is a random string added to password before hashing to prevent rainbow table attacks. bcrypt.hashSync(password, 8) automatically generates salt and includes it in the hash.

**Q30. If you get "CORS error" in browser, how will you fix it?**  
Answer: Three ways:  
1. Use app.use(cors()) in Express (we did)  
2. Manually set headers in route  
3. Use proxy in package.json of React: "proxy": "http://localhost:5000"  
We used method 1 — simplest and most common.

**Bonus Confidence Tip for Viva:**  
Always start your answer with confidence:  
"Sir/Ma’am, in this project we have successfully built a full-stack online bookstore using the modern MERN-like stack but with MySQL — React for responsive UI, Node.js + Express for REST API backend, MySQL for persistent storage, JWT + bcrypt for secure authentication, and proper folder structure following industry standards."

All the very best! You will ace this viva!