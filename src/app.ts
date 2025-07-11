import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { globalErrorhandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://event-manager-phero.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
dotenv.config();

app.use("/", router);

app.use(notFound);
app.use(globalErrorhandler);
export default app;
