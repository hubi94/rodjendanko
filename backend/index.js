require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  scrapeGiftImage,
  tryFindAuthUser,
  unauthorized,
  pool,
  withErrorHandling,
} = require("./lib");
//Import Routes
const authRoute = require("./routes/auth");
const app = express();
const port = 3001;

async function authUser(req, res, next) {
  console.log(req.headers);
  if (req.headers.authorization) {
    const [, token = ""] = req.headers.authorization.split(" ");
    const user = await tryFindAuthUser(token);
    req.user = user;
  }
  next();
}

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);

app.use(authUser);
// ------------------- CRUD LISTS ----------------------- //

app.get("/my/lists/", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  const includeArchived = req.query.includeArchived || false;
  const result = await withErrorHandling(
    res,
    "SELECT * FROM lists WHERE id_user = $1 and (not archived or archived = $2)",
    [req.user.id, includeArchived]
  );
  res.send({ lists: result.rows });
});
app.post("/my/lists", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  let result = await withErrorHandling(
    res,
    "INSERT INTO lists (id, title, archived, id_user) VALUES (default, $1, $2, $3) returning id",
    [req.body.title, req.body.archived, req.user.id]
  );
  res.status(200).json({ id: result.rows[0].id });
});
app.put("/my/lists", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  await withErrorHandling(
    res,
    "UPDATE lists SET title=$1, archived=$2 WHERE id=$3",
    [req.body.title, req.body.archived, req.body.id]
  );
  res.status(204).send();
});
app.delete("/my/lists/:id", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }

  await withErrorHandling(res, "DELETE FROM lists WHERE id=$1", [
    req.params.id,
  ]);
  res.status(204).send();
});

// ------------------------------------------------------ //

// -------------------- CRUD ITEM ----------------------- //

app.get("/lists/:id/items", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  const { id } = req.params;
  const result = await withErrorHandling(
    res,
    "SELECT * FROM items WHERE id_list = $1",
    [id]
  );
  res.send({ items: result.rows });
});
//  ------> videti sa Stefanom
app.post("/lists/:id/items", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  await withErrorHandling(
    res,
    "INSERT INTO items (id, name, gift_url, img_url, checked, id_list, id_user) VALUES (default, $1, $2, $3, $4, $5, $6)",
    [
      req.body.name,
      req.body.gift.link,
      req.body.gift.img,
      req.body.checked,
      req.params.id,
      req.user.id,
    ]
  );
  res.status(201).send();
});
app.put("/lists/:id/items", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }
  await withErrorHandling(
    res,
    "UPDATE items SET name=$1, gift_url=$2, img_url=$3, checked=$4 WHERE id=$5",
    [
      req.body.name,
      req.body.gift.link,
      req.body.gift.img,
      req.body.checked,
      req.params.id,
    ]
  );
});

app.delete("/lists/:id/items", async (req, res) => {
  if (!req.user) {
    unauthorized(res);
  }

  await withErrorHandling(res, "DELETE FROM lists WHERE id=$1", [
    req.params.id,
  ]);
  res.status(204).send();
});

// ------------------------------------------------------ //

app.post("/lists/:id/items", async (req, res) => {
  const listId = req.params.id;
  const link = req.body.gift.img;

  const fileName = await scrapeGiftImage(link);
  const imgUrl = `http://localhost:3000/uploads/${fileName}`;
  res.json({ listId, link });
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ message: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on post ${port}`);
});
