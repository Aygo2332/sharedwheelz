import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';
const PORT = process.env.PORT || 8080;
dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});