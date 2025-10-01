function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Não autorizado" });
  }
}

export default requireAuth;
