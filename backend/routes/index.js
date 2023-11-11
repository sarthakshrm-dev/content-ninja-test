const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.get("/", controller.getAllContacts);
router.post("/", controller.createContact);
router.put("/:contactId", controller.editContact);
router.delete("/:contactId", controller.deleteContact);

module.exports = router;