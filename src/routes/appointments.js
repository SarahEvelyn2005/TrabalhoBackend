const express = require("express");
const router = express.Router();
const db = require("../data/inMemoryDb");
const { v4: uuidv4 } = require("uuid");
const validate = require("../middlewares/validate");

// GET all
router.get("/", (req, res) => res.json(db.appointments));

// GET by id
router.get("/:id", (req, res) => {
  const item = db.appointments.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Appointment not found" });
  res.json(item);
});

// POST
// required: barberId, customerId, serviceId, startTime
router.post(
  "/",
  validate(["barberId", "customerId", "serviceId", "startTime"]),
  (req, res) => {
    const { barberId, customerId, serviceId, startTime, durationMinutes } =
      req.body;

    // checar se ids existem
    const barberExists = db.barbers.some((b) => b.id === barberId);
    const customerExists = db.customers.some((c) => c.id === customerId);
    const serviceExists = db.services.some((s) => s.id === serviceId);

    if (!barberExists)
      return res.status(400).json({ error: "barberId not found" });
    if (!customerExists)
      return res.status(400).json({ error: "customerId not found" });
    if (!serviceExists)
      return res.status(400).json({ error: "serviceId not found" });

    const appointment = {
      id: uuidv4(),
      barberId,
      customerId,
      serviceId,
      startTime,
      durationMinutes:
        Number(durationMinutes) ||
        db.services.find((s) => s.id === serviceId)?.durationMinutes ||
        30,
      status: "Scheduled",
    };

    db.appointments.push(appointment);
    res
      .status(201)
      .location(`/api/v1/appointments/${appointment.id}`)
      .json(appointment);
  }
);

// PUT (update)
router.put(
  "/:id",
  validate(["barberId", "customerId", "serviceId", "startTime"]),
  (req, res) => {
    const item = db.appointments.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Appointment not found" });

    const {
      barberId,
      customerId,
      serviceId,
      startTime,
      durationMinutes,
      status,
    } = req.body;

    // checar existência
    if (!db.barbers.some((b) => b.id === barberId))
      return res.status(400).json({ error: "barberId not found" });
    if (!db.customers.some((c) => c.id === customerId))
      return res.status(400).json({ error: "customerId not found" });
    if (!db.services.some((s) => s.id === serviceId))
      return res.status(400).json({ error: "serviceId not found" });

    item.barberId = barberId;
    item.customerId = customerId;
    item.serviceId = serviceId;
    item.startTime = startTime;
    item.durationMinutes = Number(durationMinutes) || item.durationMinutes;
    item.status = status || item.status;

    res.json(item);
  }
);

// DELETE
router.delete("/:id", (req, res) => {
  const idx = db.appointments.findIndex((i) => i.id === req.params.id);
  if (idx === -1)
    return res.status(404).json({ error: "Appointment not found" });
  db.appointments.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
