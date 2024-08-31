require('dotenv').config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const TEAMBUILD_ID=process.env.VerifyChannel

const roles = [
  {
    id: process.env.CSRole,
    label: 'CS',
  },
  {
    id: process.env.CERole,
    label: 'CE',
  },
  {
    id: process.env.BTechAIRole,
    label: 'BtechAI',
  },
  
  
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get(TEAMBUILD_ID);
    if (!channel) return;
    

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'Please React Below For Your Department Role And KUCC Verification/Membership Process',
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);