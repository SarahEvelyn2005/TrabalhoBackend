const express = require("express");
const router = express.Router();
const db = require("../data/inMemoryDb");
const { v4: uuidv4 } = require("uuid");
const validate = require("../middlewares/validate");

// GET all
router.get("/", (req, res) => res.json(db.customers));

// GET by id
router.get("/:id", (req, res) => {
  const item = db.customers.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Customer not found" });
  res.json(item);
});

// POST
router.post("/", validate(["fullName"]), (req, res) => {
  const { fullName, email, phone, birthDate, notes } = req.body;
  const customer = { id: uuidv4(), fullName, email, phone, birthDate, notes };
  db.customers.push(customer);
  res.status(201).location(`/api/v1/customers/${customer.id}`).json(customer);
});

// PUT
router.put("/:id", validate(["fullName"]), (req, res) => {
  const item = db.customers.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Customer not found" });
  const { fullName, email, phone, birthDate, notes } = req.body;
  item.fullName = fullName;
  item.email = email;
  item.phone = phone;
  item.birthDate = birthDate;
  item.notes = notes;
  res.json(item);
});

// DELETE
router.delete("/:id", (req, res) => {
  const idx = db.customers.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Customer not found" });
  db.customers.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
