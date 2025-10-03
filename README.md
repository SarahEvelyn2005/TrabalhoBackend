# API-Barbearia (Node.js + Express)

Descrição: API REST para gerenciar barbeiros, clientes, serviços, agendamentos e assinaturas. Dados em memória (arrays) — fim acadêmico.

## Como rodar

1. Clonar repositório
2. `npm install`
3. `npm run dev` (recomendado) ou `npm start`
4. A API estará em `http://localhost:3000/api/v1`

## Rotas (resumo)

Base: `/api/v1`

### Barbers

- `GET /api/v1/barbers` — listar (200)
- `GET /api/v1/barbers/:id` — obter (200 / 404)
- `POST /api/v1/barbers` — criar (201)
  - body example:
  ```json
  {
    "name": "João",
    "email": "joao@barber.com",
    "phone": "6199...",
    "skills": ["Corte"],
    "hourlyRate": 45
  }
  ```
