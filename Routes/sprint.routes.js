const express = require("express");
const { sprintModel } = require("../Models/sprint.model");

const sprintRouter = express.Router();

sprintRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const sprints = await sprintModel.find({ userID, ...req.query });
    res.json(sprints);
  } catch (err) {
    console.log(err);
    res.send({ msg: err.message });
  }
});

sprintRouter.post("/create", async (req, res) => {
  try {
    const post = new sprintModel(req.body);
    await post.save();
    res.send({ msg: "sprint has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: e.message });
  }
});

sprintRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await sprintModel.find({ _id: id, userID });
    if (post.length > 0) {
      await sprintModel.findByIdAndDelete(id);
      res.send({ msg: "sprint has baan deleted" });
    } else {
      throw new Error("something went wrong");
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { sprintRouter };
