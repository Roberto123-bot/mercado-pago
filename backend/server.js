import express from "express";
import cors from "cors";
import mercadopago from "./mercadopago.js";
import { users } from "./db.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// Criar PIX
app.post("/pix", async (req, res) => {
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: 9.9,
      description: "Plano Pró - Sistema de Loterias",
      payment_method_id: "pix",
      payer: {
        email: "teste@email.com",
        identification: {
          type: "CPF",
          number: "19119119100",
        },
      },
    });

    res.json({
      qr_code_base64:
        payment.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.error("ERRO MP:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook
app.post("/webhook", async (req, res) => {
  const paymentId = req.body?.data?.id;

  if (paymentId) {
    const payment = await mp.payment.get(paymentId);

    if (payment.status === "approved") {
      users["1"].plan = "PRO";
    }
  }

  res.sendStatus(200);
});

// Status do usuário
app.get("/user", (req, res) => {
  res.json(users["1"]);
});

app.listen(3000, () => {
  console.log("🔥 Backend rodando na porta 3000");
});
