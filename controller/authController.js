import User from "../models/User.js";

const authController = {
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuarios:", error);
      res.status(500).json({ message: "Erro ao buscar usuarios. ", error });
    }
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

  async signin(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || username.trim() === "") {
        return res.status(400).json({ message: "Nome é obrigatório" });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "Email já está cadastrado",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "Senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial (@$!%*?&)",
        });
      }

      const newUser = await User.createUser(username, email, password);
      res.status(201).json({ newUser });

      req.session.userId = newUser;
      req.session.userEmail = email;

      res.json({
        message: "Usuário criado com sucesso",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      return res
        .status(500)
        .json({ message: "Erro ao criar usuário. ", error });
    }
  },
};

export default authController;
