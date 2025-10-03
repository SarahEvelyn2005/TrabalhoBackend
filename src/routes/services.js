const express = require("express");
const router = express.Router();
const db = require("../data/inMemoryDb");
const { v4: uuidv4 } = require("uuid");
const validate = require("../middlewares/validate");

// GET all
router.get("/", (req, res) => res.json(db.services));

// GET by id
router.get("/:id", (req, res) => {
  const item = db.services.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Service not found" });
  res.json(item);
});

// POST
router.post("/", validate(["name", "price"]), (req, res) => {
  const { name, description, price, durationMinutes } = req.body;
  const service = {
    id: uuidv4(),
    name,
    description,
    price: Number(price),
    durationMinutes: Number(durationMinutes) || 30,
  };
  db.services.push(service);
  res.status(201).location(`/api/v1/services/${service.id}`).json(service);
});

// PUT
router.put("/:id", validate(["name", "price"]), (req, res) => {
  const item = db.services.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Service not found" });
  const { name, description, price, durationMinutes } = req.body;
  item.name = name;
  item.description = description;
  item.price = Number(price);
  item.durationMinutes = Number(durationMinutes) || item.durationMinutes;
  res.json(item);
});

// DELETE
router.delete("/:id", (req, res) => {
  const idx = db.services.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Service not found" });
  db.services.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
