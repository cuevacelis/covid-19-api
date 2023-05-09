const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 * 5 });

const myCacheMiddleware = (req, res, next) => {
  try {
    switch (req.path) {
      case "/api/coronavirus/total":
        return myCache.has("CACHE_TOTAL")
          ? res.send(myCache.get("CACHE_TOTAL")).status(200)
          : next();

      case "/api/coronavirus/countries":
        return myCache.has("CACHE_COUNTRIES")
          ? res.send(myCache.get("CACHE_COUNTRIES")).status(200)
          : next();

      default:
        return next();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  myCacheMiddleware,
  myCache,
};
