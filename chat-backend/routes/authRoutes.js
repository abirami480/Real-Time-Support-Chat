const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers, // 👈 Intha puthu function-ah controller-la irundhu edukurom
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers); // 👈 Real users-ah fetch panna intha GET route-ah add pannunga

module.exports = router;