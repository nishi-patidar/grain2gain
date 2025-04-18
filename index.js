import express from "express";
import connectToDB from "./config/db.connection.js";
import ngoRoutes from "./routes/ngo.routes.js"
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cors)
app.use(express.json());

app.use("/ngo",ngoRoutes)

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      // ✅ Change `app.listen()` to `server.listen()`
      console.log(`✅ App is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
