import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import tagsRouter from "./routes/tags.js";
  
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello</h1>");
});
app.use("/users", usersRouter);
app.use("/tags", tagsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
