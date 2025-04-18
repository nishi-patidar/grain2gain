import express from "express";
import connectToDB from "./config/db.connection.js";
import ngoRoutes from "./routes/ngo.routes.js";
import farmerRoutes from "./routes/farmer.routes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// ✅ FIX 1: Call cors() instead of passing it as a function
app.use(cors());

// ✅ FIX 2: express.json() middleware is correct
app.use(express.json());

// ✅ FIX 3: Remove invalid anonymous function before farmerRoutes
// ❌ Wrong: app.use("/farmer", () => { return console.log("farmer") }, farmerRoutes)
// ✅ Correct:
app.use("/farmer", farmerRoutes);
app.use("/ngo", ngoRoutes);

// ✅ FIX 4: Start server only after DB connection
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ App is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
