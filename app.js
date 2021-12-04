import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "./config.js";
import { resolve } from "path";
import husbands from "./src/modules/husbands.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.modules = new Collection();

const commandList = [];
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

const modules = fs
  .readdirSync("./src/modules")
  .filter((file) => file.endsWith(".js"));

modules.forEach(async (file) => {
  const module = await import(`./src/modules/${file}`);
  client.modules.set(module.default.name, module.default);
});

client.once("ready", async () => {
  console.log("Ready!");
  client.user.setActivity("with ur feelings ~ UwU");
  for (const file of commandFiles) {
    const command = await import(`./src/commands/${file}`);
    client.commands.set(command.default.name, command.default);

    const commandData = new SlashCommandBuilder()
      .setName(command.default.name)
      .setDescription(command.default.description);
    commandList.push(commandData);

    console.log(`${command.default.name} loaded`);
  }
  /*
  const Guilds = client.guilds.cache.map((guild) => guild.id);
  Guilds.forEach(async (guild_id) => {
    try {
      const rest = new REST({ version: "9" }).setToken(config.token);
      await rest.put(
        Routes.applicationGuildCommands(config.client_id, guild_id),
        { body: commandList }
      );
    } catch (e) {
      console.log(e);
    }
  });*/
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "Sowwy i cannot do that ~",
        ephemeral: true,
      });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const todaySevenAm = new Date();
  todaySevenAm.setHours(7, 0, 0, 0);

  const todayHeightAm = new Date();
  todayHeightAm.setHours(8, 0, 0, 0);
  if (
    message.createdTimestamp >= Date.parse(todaySevenAm) &&
    message.createdTimestamp < Date.parse(todayHeightAm) &&
    husbands.alreadyMarried(message.author.id) === true
  ) {
    try {
      await client.modules.get("itterashai").execute(message, "morning");
    } catch (e) {
      console.error(e);
      await message.reply({
        content: "Sowwy i'm kinda busy ~",
        ephemeral: true,
      });
    }
  }

  const todayEighteen = new Date();
  todayEighteen.setHours(18, 0, 0, 0);

  const todayTwenty = new Date();
  todayTwenty.setHours(20, 0, 0, 0);
  if (
    message.createdTimestamp >= Date.parse(todayEighteen) &&
    message.createdTimestamp < Date.parse(todayTwenty) &&
    husbands.alreadyMarried(message.author.id) === true
  ) {
    try {
      await client.modules.get("okairi").execute(message, "night");
    } catch (e) {
      console.error(e);
      await message.reply({
        content: "Sowwy i'm kinda busy ~",
        ephemeral: true,
      });
    }
  }
});

client.login(config.token);
