import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
