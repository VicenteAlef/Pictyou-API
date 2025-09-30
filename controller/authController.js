import User from "../models/User.js";

const authController = {
  hello(req, res) {
    return res.status(200).json({ message: "Hi there!" });
  },

  status(req, res) {
    return res.status(200).json({ message: "All ok" });
  },

  async listUsers(req, res) {
    try {
      const users = await User.listUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuarios:", error);
      res.status(500).json({ message: "Erro ao buscar usuarios. ", error });
    }
  },

  async createUser(req, res) {
    try {
      const { nome, email } = req.body;

      if (!nome || nome.trim() === "") {
        return res.status(400).json({ message: "Nome é obrigatório" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const newUser = User.createUser(nome, email);
      res.status(201).json({ message: "Usuário criado", newUser });
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      return res
        .status(500)
        .json({ message: "Erro ao criar usuário. ", error });
    }
  },
};

export default authController;
