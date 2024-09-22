import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbconfig/dbconnection.js";
import router from "./routes/blogRoutes.js";

const app = express();

const result = dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/blogs", router);  
app.use("/uploads", express.static("uploads"));

// Routes
// app.use("/api/blogs", );  // Blog route


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is runnig in ${port}`);
});
