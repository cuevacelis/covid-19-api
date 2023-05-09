const express = require("express");
const Corona = require("../models/corona.js");
const { myCache } = require("../middleware/cache-middleware.js");

const router = express.Router();

router.get("/api/author", (req, res) => {
  res.send({
    developer: "Jose Cueva Celis",
    linkedin: "https://www.linkedin.com/in/cuevacelis/",
  });
});

router.get("/", (req, res) => {
  res.status(500);
});

router.get("/api/coronavirus/countries", async (req, res) => {
  try {
    const API_CORONA = new Corona();
    const DATA_COUNTRIES = await API_CORONA.countries();
    myCache.set("CACHE_COUNTRIES", DATA_COUNTRIES);
    res.send(DATA_COUNTRIES);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/coronavirus/total", async ({ ipInfo }, res) => {
  try {
    const API_CORONA = new Corona();
    const DATA_TOTAL = await API_CORONA.total();
    myCache.set("CACHE_TOTAL", DATA_TOTAL);
    res.send(DATA_TOTAL);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
