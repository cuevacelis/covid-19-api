import express from "express";
import Corona from "../models/corona.js";

const router = express.Router();

router.get("/api/coronavirus/countries", async (req, res) => {
  try {
    const API = new Corona();
    console.log(API);
    const data = await API.countries();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/coronavirus/total", async ({ ipInfo }, res) => {
  try {
    const API = new Corona();
    const data = await API.total();
    /* const response =
      process.env.NODE_ENV === "development" ? data : { ...data, country: getName(ipInfo.country) };
*/
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
