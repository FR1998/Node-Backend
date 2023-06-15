const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { ObjectId } = require("mongodb");

const test = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    try {
      const decode = await jwt.verify(token, "fake-jwt-secret");
      const ObjectID = require("mongodb").ObjectId;
      const o_id = new ObjectID(decode.user._id);
      const user = await User.findOne({ _id: o_id });
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

module.exports = test;
