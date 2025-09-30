const authController = {
  hello(req, res) {
    return res.status(200).json({ message: "Hi there!" });
  },

  status(req, res) {
    return res.status(200).json({ message: "All ok" });
  },
};

export default authController;
