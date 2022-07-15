const axios = require("axios")
const fs = require("fs")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

require('dotenv').config()

class UniqueConstraintFailedError extends Error {
  constructor(constraint) {
    super('DB unique constraint error')
    this.name = this.constructor.name
    this.constraint = constraint;
  }
}

// const s3 = require('s3');
// const path = require('path');

// let s3Client = s3.createClient({
//   s3Options: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_ACCESS_SECRET,
//   },
// });
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "rodjendanko",
  port: 5432,
});

function unauthorized(res) {
  res
    .status(403)
    .json({ message: "You need to be logged in to perform this action" });
}

async function withErrorHandling(res, query, values) {
  try {
    console.log("[PSQL] EXECUTING SQL: ", query);
    console.log("[PSQL] VALUES: ", values);
    return await pool.query(query, values);
  } catch (err) {

    if (err.code === '23505') {
      throw new UniqueConstraintFailedError(err.constraint)
    }

    console.error("WE HAVE AN ERROR: ", err);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

async function tryFindAuthUser(jwtToken) {
  if (jwtToken) {
    const decodedToken = jwt.decode(jwtToken)
    const result = await pool.query(`SELECT * FROM users where id = $1`, [decodedToken.userId])
    if (result.rows.length > 0) {
      return result.rows[0]
    }

    return null
  }

  return null
}

async function scrapeGiftImage(url) {
  console.log("Attempting to get image: ", url);

  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  console.log("Writting image data to local disk...");
  const imgData = Buffer.from(response.data, "base64");
  const fileName = `moja-slika-${Date.now()}.png`;
  const imgPath = `./public/uploads/${fileName}`;
  fs.writeFileSync(imgPath, imgData);

  return fileName;
}

function hash(rawPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(rawPassword, saltRounds, function(err, hash) {
      if (err) return reject(err);
      resolve(hash);
  });
  })
}

function compareHash (givenPassword, hash) {
   return new Promise ((resolve, reject) => {
   bcrypt.compare(givenPassword, hash, function(err, result) {
    if (err) return reject(err);
      resolve(result);
   })
});

}

function makeToken(userId) {
  const token = jwt.sign({ userId },  process.env.JWT_SECRET_KEY);
  return token;
}

module.exports = {
  scrapeGiftImage,
  tryFindAuthUser,
  unauthorized,
  withErrorHandling,
  pool,
  hash,
  makeToken,
  UniqueConstraintFailedError,
  compareHash
};
