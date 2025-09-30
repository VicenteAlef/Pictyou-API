import pool from "../config/database.js";

class User {
  static async listUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async createUser(nome, email) {
    const [result] = await pool.query(
      "INSERT INTO users (nome, email) VALUES (?, ?)",
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  }
}

export default User;
