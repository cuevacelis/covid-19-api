const { getTotal, getCountries } = require("../db/index.js");

class Corona {
  async total() {
    try {
      const dataTotal = await getTotal();
      return dataTotal;
    } catch (error) {
      throw error;
    }
  }

  async countries() {
    try {
      const dataCountries = await getCountries();
      return dataCountries;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Corona;
