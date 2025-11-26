Nice — I’ll walk you through **from absolute scratch to running the whole project** (backend + frontend). You said *code is already there*, so I’ll focus on the exact **commands / clicks / checks** you need to do now (Windows paths shown — change if on macOS/Linux). Follow steps in order.

# 0) Quick checklist (what you must have)

* VS Code (or any editor)
* XAMPP installed and working (Apache + MySQL) — MySQL we used on **port 3307** earlier
* Node.js + npm installed
* Your project folders:

  * `C:\xampp\htdocs\result_api\` (PHP files: `db.php`, `save_result.php`, `get_results.php`)
  * a React app folder (e.g. `C:\Users\You\projects\result-calculator\`) with `src/App.jsx`, etc.

---

# 1) Start XAMPP (Apache + MySQL)

1. Run **XAMPP Control Panel** as Administrator (right-click → Run as admin).
2. Start **Apache** and **MySQL**.

   * If MySQL does not start, check XAMPP logs → MySQL or run `netstat -ano | findstr 3307` to check port use.
   * If you changed MySQL to port `3307` earlier, make sure that is still set in `my.ini`.

✅ Expected: both show green “Running”.

---

# 2) Confirm DB & table exist (phpMyAdmin)

1. Open browser: `http://localhost/phpmyadmin`
2. If phpMyAdmin shows, run SQL (SQL tab) — copy & paste:

```sql
CREATE DATABASE IF NOT EXISTS college_results CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE college_results;

CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(150) DEFAULT '',
  sub1_mid FLOAT NOT NULL,
  sub1_end FLOAT NOT NULL,
  sub2_mid FLOAT NOT NULL,
  sub2_end FLOAT NOT NULL,
  sub3_mid FLOAT NOT NULL,
  sub3_end FLOAT NOT NULL,
  sub4_mid FLOAT NOT NULL,
  sub4_end FLOAT NOT NULL,
  avg_percentage FLOAT NOT NULL,
  cgpa FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

* Run it. You should see the `college_results` DB and `results` table appear in the left sidebar.

---

# 3) Verify PHP backend files are in the right place

Open `C:\xampp\htdocs\result_api\` and ensure you have:

* `db.php` — must create a **$pdo** instance or be compatible with whichever save file you use. Recommended `db.php` (PDO + port 3307):

```php
<?php
$host = '127.0.0.1';
$port = '3307';
$db   = 'college_results';
$user = 'root';
$pass = ''; // put root password if you set one
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: '.$e->getMessage()]);
    exit;
}
```

* `save_result.php` — use the latest file I gave you (normalises by 50, weights 30/70, returns sub1..sub4, avg_percentage, cgpa). Make sure it `require 'db.php';` (so it can use `$pdo`). If you used mysqli variant earlier, adapt accordingly.

* `get_results.php` — optional, but handy to test.

---

# 4) Quick backend test (in browser or curl)

1. Test GET:

   * Open: `http://localhost/result_api/get_results.php`
   * You should see JSON (maybe `{"success":true,"results":[]}`).

2. Test POST (quick curl; open PowerShell / CMD):

```bash
curl -X POST http://localhost/result_api/save_result.php -H "Content-Type: application/json" -d "{\"student_name\":\"Test\",\"sub1_mid\":50,\"sub1_end\":50,\"sub2_mid\":50,\"sub2_end\":50,\"sub3_mid\":50,\"sub3_end\":50,\"sub4_mid\":50,\"sub4_end\":50}"
```

* Expected: JSON with `success: true` and fields `sub1..sub4`, `avg_percentage`, `cgpa`.

If GET/POST fail:

* Open Apache error log: XAMPP Panel → Apache → Logs → error.log
* Check `mysql_error.log` for DB problems.

---

# 5) Frontend: start dev server (Vite / React)

1. Open Terminal / VS Code integrated terminal and `cd` into your React project folder:

```bash
cd C:\Users\YourUser\path\to\result-calculator
```

2. Install deps (if not already):

```bash
npm install
```

3. Ensure `src/App.jsx` uses the correct API base:

* For dev, easiest: use **relative path** to avoid CORS headaches — change fetch to:

```js
// inside handleSubmit fetch
const res = await fetch('/result_api/save_result.php', { ... });
```

(If you keep `API_BASE`, ensure `.env` has `VITE_API_BASE=http://localhost` (or include port if Apache has a different port).)

4. Start dev server:

```bash
npm run dev
```

5. Open the Vite dev URL printed (usually `http://localhost:5173`) and test the form.

**If you see** `Network error: Failed to fetch`:

* Open browser and go to `http://localhost/result_api/get_results.php`. If that works, then URL mismatch: ensure frontend fetch uses `/result_api/save_result.php` or correct host/port.
* Check browser console → Network tab for request to `save_result.php`. See status code and response.

---

# 6) Build & serve from Apache (optional — one-server production)

If you prefer to serve the frontend from Apache so everything is `http://localhost/...`:

1. Build React:

```bash
npm run build
```

2. Copy contents of `dist/` into a new folder inside htdocs, e.g.:

```
C:\xampp\htdocs\result_app\   <-- copy all files from dist here
```

3. Keep your API in `C:\xampp\htdocs\result_api\` (unchanged).
4. Open `http://localhost/result_app/` — the app will fetch `/result_api/save_result.php` (relative path), so no CORS required.

---

# 7) Common fixes & tips (fast)

* **If phpMyAdmin login error** → edit `C:\xampp\phpMyAdmin\config.inc.php` to ensure port `3307` and correct root password (if set).
* **If MySQL port changed** → update `db.php` DSN with `port=xxxx`.
* **If "Marks must be between 0 and 50"** → frontend must accept only 0–50. Use `type="number" min="0" max="50"`.
* **If DB insert fails** → check PHP error with Apache logs and ensure PDO `$pdo` is created properly.
* **If CORS error** → either use relative paths (recommended) or ensure PHP sends `Access-Control-Allow-Origin: *` (our saved file does).
* **If data looks wrong** → re-check formulas; backend uses `($mid/50)*30 + ($end/50)*70` ⇒ returns 0–100 for each subject.

---

# 8) Final sanity test (sample run)

1. Start XAMPP (Apache + MySQL).
2. Visit `http://localhost/phpmyadmin` — confirm DB/table exist.
3. Start React dev server (`npm run dev`) or open `http://localhost/result_app/` if built & deployed.
4. Enter sample marks:

   * s1_mid=50, s1_end=50
   * s2_mid=50, s2_end=43
   * s3_mid=30, s3_end=30
   * s4_mid=50, s4_end=50
5. Click **Calculate & Save**. Expected local preview (per subject percent) and server response showing sub1..sub4, avg_percentage and cgpa.

---

If you want, I can now:

* produce a **one-click checklist** (commands you can paste into terminal), or
* give a tiny script to test the API automatically (curl + JSON) to verify everything is working.

Which would you like?
