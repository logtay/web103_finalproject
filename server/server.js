import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
  
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello</h1>");
});
app.use("/users", usersRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
