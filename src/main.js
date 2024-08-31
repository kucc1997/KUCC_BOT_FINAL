
require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const { truncate } = require("fs");
const reactroles=require("../modules/reactroles.js")

const welcome=require("../modules/welcome.js")
const announce=require("../modules/announcement.js")
const interactionshandler=require("../modules/interactionhandler.js")
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    
  ],
 
});



client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  welcome(client);
  reactroles(client);
  announce(client);
});


client.on("interactionCreate", async (interaction) => {
    try {
      interactionshandler(interaction)


      
     
      
     
      
    } catch (error) {
      console.log(error);
    }
  });
client.login(process.env.TOKEN);
