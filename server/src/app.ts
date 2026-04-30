import express from "express"
import type { Express } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())


app.use(errorHandler)
export default app;