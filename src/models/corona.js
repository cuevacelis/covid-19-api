const { getTotal, getCountries } = require("../db/index.js");

class Corona {
  async total() {
    return await getTotal();
  }

  async countries() {
    return await getCountries();
  }
}

module.exports = Corona;
