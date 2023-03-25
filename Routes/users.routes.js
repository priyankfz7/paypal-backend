const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.status(401);
      res.send({ msg: "Something went wrong" });
    } else {
      try {
        let users = await UserModel.find({ username: data.username });
        console.log(users);
        if (users.length > 0) {
          throw new Error("user already exist");
        } else {
          const user = new UserModel({ ...data, password: hash });
          await user.save();
          res.send({
            msg: "Registration successfull",
          });
        }
      } catch (err) {
        res.status(400).send({ msg: err.message });
      }
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { usercred, password } = req.body;
  try {
    const users = await UserModel.find({
      $or: [{ username: usercred }, { email: usercred }],
    });
    if (users.length > 0) {
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: users[0]._id }, "priyank");
          res.send({ msg: "login successfull", token: token });
        }
      });
    } else {
      throw new Error("user not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = { userRouter };
