import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import psnRouter from "./routes/psn";

dotenv.config();

const app: Express = express();

app.use(express.json(), cors());
app.use("/psn", psnRouter);

app.listen(process.env.PORT, () => {
	console.log("suiiiii");
});
