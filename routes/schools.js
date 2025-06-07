const express = require("express");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const db = require("../database");

router.post(
  "/addSchool",
  [
    body("name")
      .notEmpty()
      .withMessage("School name is required")
      .isString()
      .withMessage("School name must be a string"),

    body("address")
      .notEmpty()
      .withMessage("School address is required")
      .isString()
      .withMessage("School address must be a string"),

    body("latitude")
      .notEmpty()
      .withMessage("Latitude is required")
      .isFloat()
      .withMessage("Latitude must be a valid number"),

    body("longitude")
      .notEmpty()
      .withMessage("Longitude is required")
      .isFloat()
      .withMessage("Longitude must be a valid number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input data",
        details: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { name, address, latitude, longitude } = req.body;

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "School added successfully" });
    });
  }
);

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// List Schools API
router.get(
  "/listSchools",
  [
    query("latitude")
      .notEmpty()
      .withMessage("Latitude is required")
      .isFloat()
      .withMessage("Latitude must be a valid number"),

    query("longitude")
      .notEmpty()
      .withMessage("Longitude is required")
      .isFloat()
      .withMessage("Longitude must be a valid number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input data",
        // err : errors.array()
        details: errors.array().map((e) => ({
          field: e.path,
          message: e.msg,
        })),
      });
    }

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const query = "SELECT * FROM schools";
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      const sorted = results
        .map((school) => {
          const distance = getDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude
          );
          return { ...school, distance };
        })
        .sort((a, b) => a.distance - b.distance);

      res.json(sorted);
    });
  }
);

module.exports = router;
