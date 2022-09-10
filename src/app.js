import router from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(5000, () => {
  console.log("Magic happens on port 5000");
});
