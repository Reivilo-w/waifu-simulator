import fs from "fs";

const husbands = {
  name: "husbands",
  async execute(message) {},
  async addHusband(husbandId) {
    const alreadyMarried = this.alreadyMarried(husbandId);
    if (alreadyMarried === false) {
      fs.readFile("./husbands.json", "utf8", (err, data) => {
        if (err) throw err;
        const husbands = JSON.parse(data);
        husbands.husbands.push({ id: husbandId, morning: false, night: false });
        fs.writeFile("./husbands.json", JSON.stringify(husbands), (err) => {
          if (err) throw err;
        });
      });
      return true;
    }
    return false;
  },
  async removeHusband(husbandId) {
    const alreadyMarried = this.alreadyMarried(husbandId);
    if (alreadyMarried === true) {
      fs.readFile("./husbands.json", "utf8", (err, data) => {
        if (err) throw err;
        const husbands = JSON.parse(data);
        husbands.husbands = husbands.husbands.filter(
          (husband) => husband.id !== husbandId
        );
        fs.writeFile("./husbands.json", JSON.stringify(husbands), (err) => {
          if (err) throw err;
        });
      });
      return true;
    }
    return false;
  },
  alreadyMarried(husbandId) {
    const json = fs.readFileSync("./husbands.json");
    const data = JSON.parse(json);
    const alreadyMarried = data.husbands.find((husband) => husband.id === husbandId);
    if (alreadyMarried) {
      return true;
    }
    return false;
  },
  async needReply(husbandId, time) {
    // time = morning | night
    const data = fs.readFileSync("./husbands.json");
    const replied = JSON.parse(data);
    const husband = replied.husbands.find((e) => e.id === husbandId);
    if (husband) {
      if (husband[time] === false) return true;
    }

    return false;
  },
  async updateReply(husbandId, time, reply) {
    // time = morning | night
    // reply = true | false
    const data = fs.readFileSync("./husbands.json");
    const replied = JSON.parse(data);
    const husband = replied.husbands.find((e) => e.id === husbandId);
    if (husband) {
      const newReplied = {husbands: replied.husbands.filter((e) => e.id !== husbandId)};
      husband[time] = reply;
      console.log(newReplied);
      newReplied.husbands.push(husband);
      fs.writeFileSync("./husbands.json", JSON.stringify(newReplied));
      return true;
    }
    return false;
  },
};
export default husbands;
