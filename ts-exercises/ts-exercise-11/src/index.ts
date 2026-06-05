import express from "express";
import goodbyeRoutes from "./routes/goodbye.routes.js";

const app = express();

app.use(express.json());
app.use("/goodbye", goodbyeRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});