const https = require('https');
const fs = require('fs');
const express = require("express");
require('dotenv').config();
const app = express();

const cors = require('cors');


const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

const sslOptions = {
  key: fs.readFileSync(process.env.privkey),
  cert: fs.readFileSync(process.env.fullchain),
};

app.use(cors(corsOptions));

app.post("/back/paymentDetails/4", (req, res) => {
  res.status(200).send({
    created_at: "2024.12.18",
    book_image: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191056372.jpg",
    order_status: "거래중",
    title: "돈의 심리학(30만 부 기념 스페셜 에디션)",
    payment_type: "kakao",
    price: 15000,
    amount: 14500,
    orders_id: 4,
    review_id: null,
    member_id: 1
  });
});

app.post("/back/paymentDetails/1", (req, res) => {
  res.status(200).send({
    created_at: "2024.12.18",
    book_image: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791199015807.jpg",
    order_status: "구매완료",
    title: "초효율",
    payment_type: "kakao",
    price: 15000,
    amount: 15000,
    orders_id: 1,
    review_id: null,
    member_id: 1
  });
});

const PORT = 3000;

https.createServer(sslOptions, app).listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});