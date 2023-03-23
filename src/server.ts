import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import psnRouter from "./routes/psn";
import steamRouter from "./routes/steam";

dotenv.config();

const app: Express = express();

app.use(express.json(), cors());
app.use("/psn", psnRouter);
app.use("/steam", steamRouter);

app.listen(process.env.PORT, () => {
	console.log("suiiiii");
});
