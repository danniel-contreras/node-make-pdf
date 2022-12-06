const express = require("express");
const { SendMail } = require("../functions/mailer");
const { makePDF } = require("../functions/make-pdf");
const router = express.Router();

router.post("/facela-api/make-pdf", (req, res) => makePDF(req, res));

router.post("/facela-api/send-mail", (req, res) => SendMail(req, res));

module.exports = { router };
