const router = require("express").Router();
const lib = require("../lib");

router.post("/login", async (req, res) => {
  const { email = "", username = "", password } = req.body;
  const sql =
    "SELECT id, password_hash FROM users WHERE (email = $1 OR username = $2)";
  const values = [email, username];
  const results = await lib.withErrorHandling(res, sql, values);
  if (
    results.rows.length === 0 ||
    !(await lib.compareHash(password, results.rows[0].password_hash))
  ) {
    res.status(403).json({ message: "Invalid username password" });
    return;
  }
  res.json({ token: lib.makeToken(results.rows[0].id) });
});

router.post("/register", async (req, res) => {
  const { email, username, password, fullName } = req.body;
  console.log("GOT PASSWORD: ", password);
  const sql =
    "INSERT INTO users (id, email, full_name, password_hash, username) VALUES (default, $1, $2, $3, $4) RETURNING id";
  const values = [email, fullName, await lib.hash(password.trim()), username];
  try {
    const results = await lib.withErrorHandling(res, sql, values);
    res.json({ token: lib.makeToken(results.rows[0].id) });
  } catch (err) {
    if (err instanceof lib.UniqueConstraintFailedError) {
      if (err.constraint === "users_username_uindex") {
        res.status(400).json({ message: "Username already taken" });
      }

      if (err.constraint === "users_email_uindex") {
        res.status(400).json({ message: "Email already taken" });
      }
    }
  }
});

module.exports = router;
