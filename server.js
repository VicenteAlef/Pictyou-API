import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 horas
  })
);

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
