import husbands from "./husbands.js";

const itterashai = {
  name: "itterashai",
  async execute(message) {
    if ((await husbands.needReply(message.author.id, "morning")) === false)
      return;

    const updateHusband = await husbands.updateReply(
      message.author.id,
      "morning",
      true
    );
    if (updateHusband === false) throw "oof";

    message.reply("Itterashai anata ~");
  },
};
export default itterashai;
