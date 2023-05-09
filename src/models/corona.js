const { db, getTotal, getCountries } = require("../db/index.js");

class Corona {
  async total() {
    try {
      await getTotal();
      const dataTotal = await db.get("total");
      return dataTotal;
    } catch (error) {
      throw error;
    }
  }

  async countries() {
    try {
      await getCountries();
      const dataCountries = await db.get("countries");
      return dataCountries;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Corona;
