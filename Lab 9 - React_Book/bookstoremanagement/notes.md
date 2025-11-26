### Full Project Explanation: Online Bookstore Application

This project is a simple full-stack web application for an online bookstore. It allows users to register, log in, and browse a catalog of books. The backend handles user authentication (using JWT for sessions) and serves book data from a MySQL database. The frontend is built with React and provides a user interface for login, registration, and viewing the book catalog.

The project is structured as a monorepo with two main folders: `backend` (Node.js/Express server) and `frontend` (React app). There's also a SQL script (`book.sql`) for setting up the database and a `how_to_run.txt` file with instructions.

I'll break this down step-by-step: **overview**, **architecture**, **database setup**, **backend in detail**, **frontend in detail**, **how it all connects**, **running the project**, and **potential exam/viva tips**. This is based on the code in the provided XML document.

#### 1. Project Overview
- **Purpose**: A basic e-commerce-like app for books. Users can:
  - Register a new account.
  - Log in with email/password.
  - View a list of books (title, author, price) in a catalog.
- **Features**:
  - User authentication (registration and login) with password hashing (bcrypt) and JWT tokens for secure sessions.
  - Book catalog fetched from a database.
  - No advanced features like adding books, shopping cart, or payments—it's a minimal viable product (MVP).
- **Technologies**:
  - **Backend**: Node.js, Express.js (web server), MySQL (database), bcrypt (password hashing), JWT (authentication tokens), dotenv (environment variables).
  - **Frontend**: React.js (UI library), React Router (routing), Axios (HTTP requests to backend), Create React App (boilerplate).
  - **Database**: MySQL with two tables: `users` and `books`.
- **Security Notes**: Passwords are hashed, JWT is used for auth, but no role-based access or input validation beyond basics. In a real app, add more security (e.g., rate limiting, HTTPS).
- **Assumptions**: Runs locally. Backend on port 5000, frontend on port 3000. Database on localhost:3306 (default MySQL port).

The code has some redundancies (e.g., auth logic duplicated in `controllers/authController.js` and `routes/auth.js`), which might be for modularity but could be refactored.

#### 2. Architecture
- **Client-Server Model**:
  - **Frontend (Client)**: React app that renders UI and makes API calls to the backend (e.g., POST to `/api/auth/login` for login).
  - **Backend (Server)**: Express server that handles API routes, connects to MySQL, and responds with JSON data.
  - **Database**: MySQL stores users and books. Backend queries it using `mysql2` library.
- **Data Flow**:
  1. User interacts with frontend (e.g., submits login form).
  2. Frontend sends HTTP request (via Axios) to backend API.
  3. Backend validates (e.g., checks password), queries DB if needed, and responds (e.g., with JWT token).
  4. Frontend stores token in localStorage and redirects (e.g., to catalog).
  5. For catalog, frontend fetches books from `/api/books` and displays them.
- **State Management**: Frontend uses React hooks (useState, useEffect). No Redux or advanced state (simple app).
- **Routing**:
  - Backend: Express routes for auth and books.
  - Frontend: React Router for pages (home/login, catalog).

#### 3. Database Setup (`book.sql`)
This SQL script creates the database and populates it with sample data.

- **Code Breakdown**:
  ```sql
  CREATE DATABASE bookstore;
  USE bookstore;
  CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255));

  CREATE TABLE books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), author VARCHAR(255), price DECIMAL(10,2));
  INSERT INTO books (title, author, price) VALUES('The Alchemist', 'Paulo Coelho', 10.99),
  ('1984', 'George Orwell', 8.99),('Rich Dad Poor Dad', 'Robert Kiyosaki', 12.50);
  ```
- **What it Does**:
  - Creates a database named `bookstore`.
  - Switches to it with `USE`.
  - Creates `users` table:
    - `id`: Auto-incrementing primary key.
    - `name`: User's full name.
    - `email`: Unique (prevents duplicates).
    - `password`: Hashed password (stored as string).
  - Creates `books` table:
    - `id`: Auto-incrementing primary key.
    - `title`, `author`: Book details.
    - `price`: Decimal for money (up to 10 digits, 2 after decimal).
  - Inserts 3 sample books.
- **How to Run**: In MySQL workbench or command line: `mysql -u root -p < book.sql` (use password from `.env`).
- **Notes**: No foreign keys or advanced constraints. In viva, mention this is a simple schema; real apps would add timestamps, roles, etc.

#### 4. Backend Explanation
Backend is in `/backend`. It uses Express to create a REST API. Key files:

- **`.env`**:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=mysql@password123
  DB_NAME=bookstore
  JWT_SECRET=mySuperSecretKey123!
  ```
  - Environment variables for DB connection and JWT secret. Loaded via `dotenv`. In production, keep secret secure.

- **`db.js`**:
  - Connects to MySQL using `mysql2`.
  - Code: Creates a connection pool with host, user, port (defaults to 3306 if not set), password, database.
  - Attempts connection; logs success or error but doesn't crash server.
  - Exports the connection for use in other files.
  - **What it Does**: Handles DB connection. Queries in routes use `db.query()`.

- **`index.js`** (Main Server File):
  - Imports Express, CORS (for cross-origin requests from frontend), body-parser (parse JSON requests).
  - Imports routes: `authRoutes` and `bookRoutes`.
  - Sets up app: Enables CORS, JSON parsing.
  - Mounts routes: `/api/auth` for auth, `/api/books` for books.
  - Listens on port 5000.
  - **What it Does**: Entry point. Starts the server: `node index.js`.

- **`package.json`**:
  - Defines dependencies (express, mysql2, bcryptjs, jwt, etc.).
  - Scripts: `start` (run index.js), `dev` (nodemon for auto-reload), `test` (placeholder).

- **Controllers**:
  - **`authController.js`**:
    - Handles register and login (though routes are defined here as a router—bit redundant with `routes/auth.js`).
    - **Register**: Hashes password with bcrypt, inserts user into DB. Responds with success or error.
    - **Login**: Queries user by email, compares password with bcrypt, generates JWT token if valid. Responds with token and user info.
    - Exports router.
  - **`bookController.js`**:
    - Simple: `getBooks` queries all books from DB and sends them as JSON.

- **Routes**:
  - **`auth.js`**:
    - Similar to authController: POST `/register` (hash + insert), POST `/login` (query + compare + JWT).
    - Duplication here—perhaps for separation, but could be merged.
  - **`books.js`**:
    - GET `/` : Queries all books, sends JSON.

- **Overall Backend Flow**:
  - Server starts, connects to DB.
  - On register: Hash password, insert user.
  - On login: Verify credentials, issue JWT (expires in 1h).
  - On books: Fetch all from DB (no auth required—vulnerability? In real app, protect with middleware).
  - Errors: Logs to console, sends 500/404/401 responses.

#### 5. Frontend Explanation
Frontend is in `/frontend`. Built with Create React App. Key files:

- **`package.json`**:
  - Dependencies: React, React Router, Axios (for API calls), testing libs.
  - Scripts: `start` (dev server), `build`, `test`, `eject`.

- **`public/index.html`**: Base HTML template. Loads React app in `<div id="root">`.

- **`src/index.js`**: Entry point. Renders `<App />` with React StrictMode.

- **`src/App.js`** (Main Component):
  - Uses React Router: Routes for `/` (home/login) and `/catalogue`.
  - Renders header and routes.
  - **What it Does**: Sets up routing. Home shows Login component.

- **Components**:
  - **`Login.js`**:
    - State: User (email/password), message, showRegister.
    - Form: Inputs for email/password. On submit, Axios POST to `/api/auth/login`.
    - If success: Store token in localStorage, navigate to `/catalogue`.
    - Button to toggle to Register.
    - **What it Does**: Handles login. Uses `useNavigate` for redirect.
  - **`Register.js`**:
    - Similar: State for user (name/email/password).
    - Form: POST to `/api/auth/register`. Shows message on success/fail.
  - **`Catalogue.js`**:
    - State: Books array, loading.
    - useEffect: Axios GET `/api/books`, set books.
    - Renders book cards (title, author, price) in a flex grid.
    - **What it Does**: Fetches and displays books after login.
  - **`home.js`**: Unused in App.js? Seems like a home page with links, but not integrated. Perhaps a leftover.
  - **`Navbar.js`**: Simple nav with links (also unused in current App.js).

- **Other Files**:
  - `App.css`, `index.css`: Styles (basic centering, animations).
  - `logo.svg`: React logo (placeholder).
  - Tests: `App.test.js` (basic render test).
  - `reportWebVitals.js`, `setupTests.js`: Performance and testing utils.

- **Frontend Flow**:
  - App loads at `/`: Shows Login.
  - Login success: Redirect to Catalogue, which fetches books.
  - No token validation in Catalogue—assumes logged in (add middleware in real app).

#### 6. How It All Connects
- Frontend calls backend APIs (e.g., `http://localhost:5000/api/auth/login`).
- Backend uses DB for storage/queries.
- CORS allows frontend (port 3000) to access backend (5000).
- Auth: JWT token stored in localStorage; could be sent in headers for protected routes (not implemented here).

#### 7. Running the Project (`how_to_run.txt`)
1. Setup DB: Run `book.sql` in MySQL.
2. Backend: `cd backend`, `npm install`, `node index.js` (or `npm run dev`).
3. Frontend: `cd frontend`, `npm install`, `npm start`.
4. Visit `http://localhost:3000`.
5. Test credentials: email `test123@email.com`, password `test123` (from how_to_run.txt—insert manually if needed).

- **Potential Issues**: DB connection fails? Check `.env` creds. Ports conflict? Change in code. No books? Run inserts.

#### 8. Viva/Lab Exam Tips
- **Common Questions**:
  - Explain auth flow: Register hashes pw, login compares hash + issues JWT.
  - Why bcrypt/JWT? Security (hashing prevents plain pw storage, JWT for stateless auth).
  - DB schema: Pros (simple), cons (no relations, no indexes).
  - Improvements: Add auth middleware for books route, error handling, frontend validation.
  - React hooks: useState for form, useEffect for API fetch.
  - Express middleware: CORS for cross-origin, body-parser for JSON.
- **Demo Prep**: Run locally, show register/login/catalog. Explain code lines if asked.
- **Edge Cases**: Duplicate email (DB unique constraint), wrong pw (401 response).
- **Why This Stack?**: Node/Express fast for APIs, React interactive UI, MySQL relational data.

This covers the project deeply. If you need focus on a file or diagrams, ask! Good luck tomorrow!




Here are **30 expanded, confident viva answers** you can speak fluently tomorrow.  
Practice saying them out loud — examiners love students who explain clearly instead of reading from notes.

1. **What is the overall purpose of this project?**  
This is a full-stack Online Bookstore application. Users can register with their name, email, and password, log in securely, and then browse a catalogue of books with title, author, and price. It demonstrates user authentication using JWT and password hashing, CRUD operations (only Read for books), and communication between a React frontend and Node.js/Express + MySQL backend.

2. **Which technologies did you use for the backend?**  
Backend is built using Node.js with Express.js framework. We used mysql2 to connect to MySQL database, bcryptjs for password hashing, jsonwebtoken (JWT) for authentication, dotenv to manage environment variables, cors for cross-origin requests, and body-parser to parse incoming JSON data.

3. **Explain the role of CORS in your project.**  
Since the React frontend runs on http://localhost:3000 and the Express backend runs on http://localhost:5000, they are on different ports — different origins. Without CORS, the browser would block the frontend from making API calls to the backend due to same-origin policy. We added app.use(cors()) in index.js so the frontend can successfully call backend APIs.

4. **How are user passwords stored in the database? Never say "encrypted".**  
Passwords are never stored in plain text. When a user registers, we use bcrypt.hashSync(password, 8) to generate a strong one-way hash using bcryptjs with a salt round of 8. This hash is stored in the password column. When the user logs in, we fetch the hash, compare it with bcrypt.compareSync(inputPassword, storedHash), and only allow login if they match.

5. **What is JWT and why did you use it?**  
JWT stands for JSON Web Token. It is a compact, URL-safe way to represent claims between two parties. After successful login, the server creates a token using jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }). The client stores this token and can send it in the Authorization header for protected routes later. We used JWT because it is stateless — no need to store sessions on the server.

6. **Where is the JWT secret key stored and why is it important?**  
The secret key is stored in the .env file as JWT_SECRET=mySuperSecretKey123!. It must never be hard-coded or pushed to GitHub. This secret is used to both sign and verify tokens. If anyone gets this key, they can generate fake tokens and impersonate users — so in production, it should be long, random, and kept secure.

7. **How long does the login session last?**  
The JWT token expires in 1 hour because we set { expiresIn: '1h' } while signing the token. After 1 hour, the user will have to log in again.

8. **Name the two tables in your database and their columns.**  
There are two tables:  
- users → id (AUTO_INCREMENT PK), name, email (UNIQUE), password (hashed)  
- books → id (AUTO_INCREMENT PK), title, author, price (DECIMAL 10,2)

9. **What is the primary key in the books table?**  
id — it is an auto-increment integer that uniquely identifies each book.

10. **How do you start the backend server?**  
First, go to the backend folder, install dependencies using npm install, then run node index.js or npm run dev (if nodemon is installed for auto-restart during development).

11. **How do you start the frontend?**  
Go to frontend folder → npm install → npm start. This starts the Create React App development server on http://localhost:3000.

12. **On which port does the backend run?**  
Port 5000 — defined in backend/index.js as app.listen(PORT, ...)

13. **On which port does the React app run?**  
Port 3000 — default port for Create React App.

14. **What is the exact API endpoint for user login?**  
POST request to http://localhost:5000/api/auth/login with JSON body { "email": "...", "password": "..." }

15. **What is the endpoint to fetch all books?**  
GET request to http://localhost:5000/api/books — no body or authentication required (currently open).

16. **Which library do you use in React to make HTTP requests?**  
We use axios. It is simpler and more popular than fetch for React projects.

17. **Where do you store the JWT token after successful login?**  
We store it in the browser's localStorage using localStorage.setItem("token", res.data.token). This allows the token to persist even if the user refreshes the page.

18. **After successful login, where does the user get redirected?**  
We use useNavigate() from react-router-dom and call navigate("/catalogue") — so the user is taken to the book catalogue page.

19. **Which React hook fetches the books when the Catalogue page loads?**  
useEffect with an empty dependency array []. It runs once when the component mounts and calls the API to fetch books.

20. **Explain the role of useState in Login and Register components.**  
useState manages the form input values (name, email, password) and also the success/error messages shown to the user. For example: const [user, setUser] = useState({ email: "", password: "" }); and we update it on every keystroke using onChange.

21. **Why is there duplicate code in authController.js and routes/auth.js?**  
This is actually a small design mistake. Both files contain almost identical register and login logic. In proper MVC pattern, the controller should contain the business logic, and the route file should only import and use those controller functions. Having duplicate code makes maintenance harder.

22. **Is the /api/books route protected with authentication?**  
No, currently anyone can access it without logging in. This is a security limitation. In a real application, we should add a middleware that checks for a valid JWT token before sending book data.

23. **How would you protect the books route?**  
I would create a middleware function like verifyToken that extracts the token from Authorization: Bearer <token> header, verifies it using jwt.verify(token, process.env.JWT_SECRET), and only then calls next(). Then use it as router.get('/', verifyToken, getBooks).

24. **What happens if someone enters a wrong password?**  
bcrypt.compareSync() returns false → server sends status 401 with message "Invalid password". Frontend displays this message to the user.

25. **What happens if someone tries to register with an already existing email?**  
The email column has a UNIQUE constraint in MySQL. So the INSERT query fails with "Duplicate entry for key 'email'". The server catches the error and returns status 500 (we should handle it better with a proper message like "Email already exists").

26. **Name any three books that are already present in the database.**  
1. The Alchemist by Paulo Coelho – ₹10.99  
2. 1984 by George Orwell – ₹8.99  
3. Rich Dad Poor Dad by Robert Kiyosaki – ₹12.50

27. **Which package did you use for hashing passwords and why?**  
bcryptjs — it is the most trusted and widely used library for securely hashing passwords. It automatically generates a salt and is resistant to brute-force and rainbow table attacks.

28. **What is the purpose of the dotenv package?**  
It loads environment variables from a .env file into process.env so we can keep sensitive data like database password and JWT secret outside the code and not commit them to GitHub.

29. **What will happen if you forget to run the book.sql script before starting the server?**  
The database bookstore will not exist, or the tables users and books will be missing. When the server tries to query them, MySQL will throw errors like "Table doesn't exist" or "ER_NO_SUCH_TABLE", and all API calls will fail with 500 Internal Server Error.

30. **What improvements would you suggest for this project?**  
- Add JWT verification middleware to protect /api/books route  
- Proper error handling (catch duplicate email, better messages)  
- Logout functionality (clear localStorage)  
- Input validation and sanitization  
- Refresh token mechanism  
- Loading spinners and better UI/UX  
- Pagination or search for books  
- Role-based access (admin can add books)  
- Use React Context or Redux for global state instead of localStorage directly

You are now fully armed for tomorrow!  
Speak slowly, confidently, and smile — examiners love students who understand their own code deeply.  
All the very best — you will do great!