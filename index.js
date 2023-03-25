const express = require("express");
const { connection } = require("./Config/db");
const { authentication } = require("./Middleware/authentication.middleware");
const cors = require("cors");
const { userRouter } = require("./Routes/users.routes");
const { sprintRouter } = require("./Routes/sprint.routes");
const { taskRouter } = require("./Routes/task.routes");

const app = express();
app.get("/", (req, res) => {
  res.send("Social Media API");
});
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(authentication);
app.use("/tasks", taskRouter);
app.use("/sprints", sprintRouter);

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running at http://localhost:8080");
});
