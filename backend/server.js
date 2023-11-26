import path from "path";
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
import connection from "./config/db.js";
connection();
import { notFound, customErrorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

let app = express();
//body parser midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser middleware
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use("/api/upload", uploadRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route not defined will be send to index.html
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.use(notFound);
app.use(customErrorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
