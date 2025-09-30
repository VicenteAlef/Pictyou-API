import pool from "../config/database.js";
import bcrypt from "bcryptjs";

class User {
  static async listUsers() {
    const [rows] = await pool.query("SELECT id, username, email FROM users");
    return rows;
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT email FROM users WHERE email = ?",
        [email]
      );
      return rows[0] || null; // Retorna o usuário ou null se não existir
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  }

  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return { id: result.insertId, username, email };
  }
}

export default User;
