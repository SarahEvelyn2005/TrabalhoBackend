const express = require('express');
const router = express.Router();
const db = require('../data/inMemoryDb');
const { v4: uuidv4 } = require('uuid');
const validate = require('../middlewares/validate');


router.get('/', (req, res) => {
    res.json(db.barbers);
});


router.get('/:id', (req, res) => {
    const barber = db.barbers.find(b => b.id === req.params.id);
    if (!barber) return res.status(404).json({ error: 'Barber not found' });
    res.json(barber);
});


router.post('/', validate(['name', 'email']), (req, res) => {
    const { name, email, phone, skills, hourlyRate } = req.body;
    const barber = { id: uuidv4(), name, email, phone, skills: skills || [], hourlyRate: hourlyRate || 0 };
    db.barbers.push(barber);
    res
        .status(201)
        .location(`/api/v1/barbers/${barber.id}`)
        .json(barber);



router.put('/:id', validate(['name', 'email']), (req, res) => {
    const barber = db.barbers.find(b => b.id === req.params.id);
    if (!barber) return res.status(404).json({ error: 'Barber not found' });
    const { name, email, phone, skills, hourlyRate } = req.body;
    barber.name = name;
    barber.email = email;
    barber.phone = phone;
    barber.skills = skills || [];
    barber.hourlyRate = hourlyRate || barber.hourlyRate;
    res.json(barber);
});

router.delete('/:id', (req, res) => {
    const idx = db.barbers.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Barber not found' });
    db.barbers.splice(idx, 1);
    res.status(204).send();
});

module.exports = router;