const express = require("express");
const router = express.Router();
const db = require("../data/inMemoryDb");
const { v4: uuidv4 } = require("uuid");
const validate = require("../middlewares/validate");

// GET all
router.get("/", (req, res) => res.json(db.subscriptions));

// GET by id
router.get("/:id", (req, res) => {
  const item = db.subscriptions.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Subscription not found" });
  res.json(item);
});

// POST
// required: customerId, planName, monthlyPrice
router.post(
  "/",
  validate(["customerId", "planName", "monthlyPrice"]),
  (req, res) => {
    const { customerId, planName, monthlyPrice, startDate, endDate, isActive } =
      req.body;

    if (!db.customers.some((c) => c.id === customerId))
      return res.status(400).json({ error: "customerId not found" });

    const sub = {
      id: uuidv4(),
      customerId,
      planName,
      monthlyPrice: Number(monthlyPrice),
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || null,
      isActive: typeof isActive === "boolean" ? isActive : true,
    };

    db.subscriptions.push(sub);
    res.status(201).location(`/api/v1/subscriptions/${sub.id}`).json(sub);
  }
);

// PUT
router.put(
  "/:id",
  validate(["customerId", "planName", "monthlyPrice"]),
  (req, res) => {
    const item = db.subscriptions.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Subscription not found" });

    const { customerId, planName, monthlyPrice, startDate, endDate, isActive } =
      req.body;
    if (!db.customers.some((c) => c.id === customerId))
      return res.status(400).json({ error: "customerId not found" });

    item.customerId = customerId;
    item.planName = planName;
    item.monthlyPrice = Number(monthlyPrice);
    item.startDate = startDate || item.startDate;
    item.endDate = endDate || item.endDate;
    item.isActive = typeof isActive === "boolean" ? isActive : item.isActive;

    res.json(item);
  }
);

// DELETE
router.delete("/:id", (req, res) => {
  const idx = db.subscriptions.findIndex((i) => i.id === req.params.id);
  if (idx === -1)
    return res.status(404).json({ error: "Subscription not found" });
  db.subscriptions.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
