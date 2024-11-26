import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;

//connect mongo DB
import { conMongoDb } from "./config/mongoDbConfig.js";
conMongoDb();

// using middlewares
app.use(express.json());
app.use(cors());

//Api end points
import peopleRouter from "./routers/peopleRouter.js";

app.use("/api/v1/peoples", peopleRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Its live",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
