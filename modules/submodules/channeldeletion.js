
const Discord = require("discord.js");
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
  PermissionsBitField,
  ChannelType
} = require("discord.js");





// Separate function to handle the "Close Ticket" button click
module.exports = async (interaction) => {
    if (interaction.customId === 'close_ticket' || interaction.commandName==='deletechannel') {
      const channel = interaction.channel;
      await channel.delete();
    }
  };