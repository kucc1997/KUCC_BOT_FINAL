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
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require("discord.js");

module.exports = async (interaction) => {
  const modalforteam = new ModalBuilder()
    .setCustomId("KUCCVerificationForm")
    .setTitle("KUCC Verification Form");

  const ModelQuestion1 = new TextInputBuilder()
    .setCustomId("fullName")
    .setLabel("Your Full Name")
    .setStyle(TextInputStyle.Short);

  const ModelQuestion2 = new TextInputBuilder()
    .setCustomId("emailAddress")
    .setLabel("Email Address")
    .setStyle(TextInputStyle.Short);

  const ModelQuestion3 = new TextInputBuilder()
    .setCustomId("batch")
    .setLabel("Batch")
    .setStyle(TextInputStyle.Short);

    const ModelQuestion4 = new TextInputBuilder()
    .setCustomId("Course")
    .setLabel("Course")
    .setStyle(TextInputStyle.Short);



  const actionrow1 = new ActionRowBuilder().addComponents(ModelQuestion1);
  const actionrow2 = new ActionRowBuilder().addComponents(ModelQuestion2);
  const actionrow3 = new ActionRowBuilder().addComponents(ModelQuestion3);
  const actionrow4 = new ActionRowBuilder().addComponents(ModelQuestion4);

  modalforteam.addComponents(
    actionrow1,
    actionrow2,
    actionrow3,
    actionrow4
  );

  await interaction.showModal(modalforteam);
};
