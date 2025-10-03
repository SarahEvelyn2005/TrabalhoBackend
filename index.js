const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routers
const barbersRouter = require("../TrabalhoBackend/src/routes/barbers");
const customersRouter = require("../TrabalhoBackend/src/routes/customers");
const servicesRouter = require("../TrabalhoBackend/src/routes/services");
const appointmentsRouter = require("../TrabalhoBackend/src/routes/appointments");
const subscriptionsRouter = require("../TrabalhoBackend/src/routes/subscriptions");

app.use("/api/v1/barbers", barbersRouter);
app.use("/api/v1/customers", customersRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/appointments", appointmentsRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);

app.get("/api/v1", (req, res) => {
  res.json({ message: "API Barbearia - v1" });
});

// 404 para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/v1`);
});
