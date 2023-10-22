import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
import connection from "./config/db.js";
connection();
import { notFound, customErrorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

let app = express();
//body parser midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser middleware
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(customErrorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
