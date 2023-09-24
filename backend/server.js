import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
import connection from "./config/db.js";
connection();

let app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
