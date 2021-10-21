const express = require("express");
const router = express.Router();

router.get("/get/:id", (req, res) => {
  const { id } = req.params;
  res.send({ id });
});

module.exports = router;
