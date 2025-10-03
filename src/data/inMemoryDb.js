const { v4: uuidv4 } = require("uuid");

const db = {
  barbers: [
    {
      id: uuidv4(),
      name: "Carlos Silva",
      email: "carlos@barber.com",
      phone: "61900000000",
      skills: ["Corte", "Barba"],
      hourlyRate: 40,
    },
  ],
  customers: [
    {
      id: uuidv4(),
      fullName: "Maria Souza",
      email: "maria@email.com",
      phone: "61988887777",
      birthDate: "1995-06-15",
      notes: "Prefere corte curto",
    },
  ],
  services: [
    {
      id: uuidv4(),
      name: "Corte Clássico",
      description: "Corte tradicional",
      price: 35.0,
      durationMinutes: 30,
    },
  ],
  appointments: [
    // Exemplo vazio; preencher via POST
  ],
  subscriptions: [
    // Exemplo vazio
  ],
};

module.exports = db;
