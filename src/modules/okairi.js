import husbands from "./husbands.js";

const okairi = {
  name: "okairi",
  async execute(message) {
    if (await husbands.needReply(message.author.id, "night") === false) return;

    const updateHusband = await husbands.updateReply(message.author.id, "night", true);
    if(updateHusband === false) throw 'oof';
    
    message.reply("Okairi anata ~");
  },
};

export default okairi;
