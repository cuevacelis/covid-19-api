import db from "../db/index.js";

class Corona {
  async total() {
    try {
      const data = await db.get("total");
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countries() {
    try {
      const data = await db.get("countries");
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Corona;
