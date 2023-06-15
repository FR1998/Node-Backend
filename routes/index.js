const express = require("express");
const { title } = require("process");
const route = express.Router();
const connect = require("./../database/db");
const Book = require("../models/bookModel");
const test = require("../middleware/test")

route.use(express.json());
route.use(express.urlencoded({ extended: false }));

route.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

route.use(test).get("/book", async (req, res) => {
  // Get details of all books
  const books = await Book.find();
  res.json(books);
});

route.post("/book", async (req, res) => {
  //Send book details
  try {
    await Book.create(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.json(error);
  }
});

route.get("/book/:id", async (req, res) => {
  // Get book details by single ID
  try {
    const id = req.params.id;
    const ObjectID = require("mongodb").ObjectId;
    const o_id = new ObjectID(id);
    const books = await Book.find({ _id: o_id }); //Compare IDs
    res.status(202).json(books);
  } catch (error) {
    res.json(error);
  }
});

route.patch("/book/:id", async (req, res) => {
  const id = req.params.id;
  const ObjectID = require("mongodb").ObjectId;
  const o_id = new ObjectID(id);
  const db = await connect();
  const books = await Book.updateOne({ _id: o_id }, { $set: req.body });
  res.status(203).json({ data: "Book updated" });
});

route.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const ObjectID = require("mongodb").ObjectId;
  const o_id = new ObjectID(id);
  const db = await connect();
  const books = await Book.deleteOne({ _id: o_id }, { $set: req.body });
  res.status(204).json({ data: "Book deleted" });
});

module.exports = route;
