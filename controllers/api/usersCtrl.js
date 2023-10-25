const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("mern:controllers:usersCtrl");

const createJWT = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "8hr",
  });
};

const create = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    const token = createJWT(user);
    debug("token: ", token);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }
    const token = createJWT(user);
    res.status(200).json({ token });
  } catch (error) {
    const errorMessage = error.message || "Bad Credentials";
    res.status(401).json({ error: errorMessage });
  }
};

const checkToken = (req, res) => {
  debug("req.user", req.user);
  res.json(req.exp);
};

const getAllData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveRecord = async (req, res) => {
  const { userId, recordId } = req.body;
  console.log("Received data: ", req.body);

  const user = await User.findById(userId).populate("records");
  console.log("User before record addition: ", user);
  try {
    user.records.push(recordId);
    await user.save();
    res.status(200).json({ user, message: "New record saved." });
  } catch {
    res.status(403).json({ error: "Error while saving" });
  }
};

const deleteRecord = async (req, res) => {
  const { recordId, userId } = req.params;

  try {
    // find user by Id
    const user = await User.findById(userId).populate("records");

    // find index of recordId
    const recordIndex = user.records.findIndex(
      (record) => record._id.toString() === recordId
    );

    if (recordIndex !== -1) {
      user.records.splice(recordId, 1);
      await user.save();
      res.status(200).json({ user, message: "Record deleted" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create,
  login,
  checkToken,
  getAllData,
  saveRecord,
  deleteRecord,
};
