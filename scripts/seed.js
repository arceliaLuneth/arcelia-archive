const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

async function seed() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "arcelia",          // sesuaikan
    password: "10112006",       // sesuaikan
    database: "arcelia_archive",
  });

  // Hapus admin lama
  await db.execute("DELETE FROM users");

  // Buat password hash
  const password = await bcrypt.hash("admin123", 10);

  // Tambah admin baru
  await db.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    ["admin", password]
  );

  console.log("==================================");
  console.log("Admin berhasil dibuat");
  console.log("Username : admin");
  console.log("Password : admin123");
  console.log("==================================");

  await db.end();
}

seed().catch(console.error);