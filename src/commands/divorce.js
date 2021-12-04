import fs from "fs";
import husbands from "../modules/husbands.js";

const divorce = {
  name: "divorce",
  description: "Divorce >w<",
  args: false,
  async execute(interaction) {
    try {
      const deleted = await husbands.removeHusband(interaction.member.id);
      if (deleted === true) {
        interaction.reply(
          `We are not married anymore <@!${interaction.member.id}> ! ~ sad UwU`
        );
        return;
      }
      interaction.reply("We aren't married ! ~ BaKa");
    } catch (e) {
      throw e;
    }
  },
};
export default divorce;
