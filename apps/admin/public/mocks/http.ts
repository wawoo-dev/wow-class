import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";

import { handlers } from "./handlers";

const app = express();
const port = 9090;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://local-mentor.study.gdschongik.com",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(createMiddleware(...handlers) as any);

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
