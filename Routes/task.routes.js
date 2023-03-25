const express = require("express");
const { taskModel } = require("../Models/task.model");

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const tasks = await taskModel.find({ userID, ...req.query });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

taskRouter.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.send({ msg: "task has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await taskModel.findByIdAndDelete(id);
    res.send({ msg: "task has baan deleted" });
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

taskRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await taskModel.findByIdAndUpdate(id, { ...data });
    res.send({ msg: "task has baan updated" });
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = { taskRouter };
