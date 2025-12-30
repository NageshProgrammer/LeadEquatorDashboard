const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
} = require("../controllers/contact");

// POST: submit contact form
router.post("/", createContact);

// GET: fetch all contacts (admin)
router.get("/", getAllContacts);

module.exports = router;
