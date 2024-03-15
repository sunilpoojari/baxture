const express = require("express");
const app = express();

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { validation } = require("./validations");

let users = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route for get users
app.get("/api/users", (req, res) => {
  res.send(users);
});

// API route for get user with specific ID
app.get("/api/users/:userId", (req, res) => {
  if (!users[req.params.userId]) res.status(404).send("user not found");
  res.send(users[req.params.userId]);
});

// API route for creating a user
app.post("/api/users", async (req, res) => {
  try {
    const { flag, status, comments } = await validation(req.body);

    if (!flag && status === 200) {
      let id = uuidv4();
      users[id] = { id, ...req.body };
      res.status(201).send({ id, ...req.body });
    } else if (flag && status === 403) {
      res.status(403).send({ ...comments });
    } else {
      if (validationRes.flag) res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// API route for handling update user request
app.put("/api/users/:userId", async (req, res) => {
  try {
    const { flag, status, comments } = await validation(req.body);
    if (!flag && status === 200) {
      if (!users[req.params.userId]) {
        res.status(404).send("The user not found");
      } else {
        users[req.params.userId] = { ...users[req.params.userId], ...req.body };
        res.status(200).send(users[req.params.userId]);
      }
    } else if (flag && status === 403) {
      res.status(403).send({ ...comments });
    } else {
      if (validationRes.flag) res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// API route for handling delete user request
app.delete("/api/users/:userId", (req, res) => {
  try {
    if (!users[req.params.userId]) res.status(404).send("user not found");
    else {
      delete users[req.params.userId];
    }
    res.status(200).send("User deleted sucessfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// If non of the API routes matches then we will handle the requst here
app.use((req, res) => {
  res.status(404).send("The requested URI does not exists");
});

// Listening for any incoming request on a particular server
app.listen(process.env.PORT, (req, res) => {
  console.log("application is running on port 4000");
});

// Middleware for handling any unexpected errors
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Internal Server Error" });
});
