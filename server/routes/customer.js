const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

//routes
router.get("/", customerController.view);
router.get("/userdetails", customerController.userdetails);
router.get("/invoice", customerController.invoice);

router.get("/addcustomer", customerController.addcustomer);
router.post("/addcustomer", customerController.save);

router.get("/editcustomer/:id", customerController.editcustomer);
router.post("/editcustomer/:id", customerController.edit);

router.get("/deletecustomer/:id", customerController.delete);

module.exports = router;
