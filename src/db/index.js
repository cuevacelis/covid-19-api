const axios = require("axios");
const cheerio = require("cheerio");

const getTotal = async () => {
  try {
    console.log("fetch getTotal");
    const response = await axios.get(
      "https://www.worldometers.info/coronavirus/"
    );
    const total = {
      cases: null,
      deaths: null,
      recovered: null,
    };

    const html = cheerio.load(response.data);
    const numbers = html(".maincounter-number");

    for (let i = 0; i < numbers.length; i++) {
      const number = html(numbers[i]).children("span").text().trim();
      total[Object.keys(total)[i]] = number;
    }

    return total;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCountries = async () => {
  try {
    console.log("fetch getCountries");
    const response = await axios.get(
      "https://www.worldometers.info/coronavirus/"
    );
    const html = cheerio.load(response.data);
    const table = html("table#main_table_countries_today");
    const headingsNodes = table.children("thead").find("th");
    const rowsNodes = table.children("tbody").children("tr");
    const names = {
      Country: "country",
      TotalCases: "total",
      NewCases: "newCases",
      TotalDeaths: "totalDeaths",
      NewDeaths: "newDeaths",
      TotalRecovered: "totalRecovered",
      ActiveCases: "activeCases",
      Serious: "serious",
    };
    const matchName = (name) => names[name] || name;
    const headings = [];
    const countries = [];

    for (let i = 0; i < headingsNodes.length; i++) {
      headings.push(matchName(html(headingsNodes[i]).text().split(",")[0]));
    }

    for (let i = 0; i < rowsNodes.length - 1; i++) {
      const cells = html(rowsNodes[i]).children("td");
      let country = {};

      for (let o = 0; o < cells.length; o++) {
        const value = html(cells[o]).text().trim();

        country = {
          ...country,
          [headings[o]]: value.length ? value : 0,
        };
      }

      countries.push(country);
    }

    return countries;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getTotal, getCountries };
