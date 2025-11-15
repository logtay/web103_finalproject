import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import GitHub from "./config/auth.js";
import usersRouter from "./routes/users.js";
import tagsRouter from "./routes/tags.js";
import memoriesRouter from "./routes/memories.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "codepath",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello</h1>");
});

// change routes to match frontend
app.use("/users", usersRouter);
app.use("/tags", tagsRouter);
app.use("/memory", memoriesRouter);
app.use("/auth", authRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
