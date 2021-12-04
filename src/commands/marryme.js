import fs from "fs";
import husbands from "../modules/husbands.js";

const marryme = {
  name: "marryme",
  description: "Marry yourself with me ! ~ UwU",
  args: false,
  async execute(interaction) {
    try {
      const added = await husbands.addHusband(interaction.member.id);
      if (added === true) {
        interaction.reply(
          `You are now married with me <@!${interaction.member.id}> ! ~ UwU`
        );
        return;
      }

      interaction.reply("We are already married ! ~ BaKa");

    } catch (e) {
      throw e;
    }
  },
};

export default marryme;
