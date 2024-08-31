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

const verifyCategoryID = process.env.ModVerifyChannel; // Replace with your Verify category ID

module.exports = async (interaction) => {
  const Answer1 = interaction.fields.getTextInputValue('fullName');
  const Answer2 = interaction.fields.getTextInputValue('emailAddress');
  const Answer3 = interaction.fields.getTextInputValue('batch');
  const Answer4 = interaction.fields.getTextInputValue('Course');
  

  const MemberformEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Verification Model')
    .addFields(
      { name: "Issued By", value: `<@${interaction.user.id}>!` },
      { name: " Name", value: Answer1 },
      { name: " Email", value: Answer2 },
      { name: "Batch", value: Answer3 },
      { name: "Course", value: Answer4 },
    );

  // Find the verify category
  const verifyCategory = interaction.guild.channels.cache.get(verifyCategoryID);
  if (!verifyCategory || verifyCategory.type !== ChannelType.GuildCategory) {
    await interaction.reply({ content: "Verify category not found or is not a category.", ephemeral: true });
    return;
  }

  // Find the Moderator role by name
  const moderatorRole = interaction.guild.roles.cache.find(role => role.name == process.env.Modrolename);
  if (!moderatorRole) {
    await interaction.reply({ content: "Moderator role not found.", ephemeral: true });
    return;
  }

  // Create a new channel under the verify category
  const newChannel = await interaction.guild.channels.create({
    name: `member-request-${interaction.user.username}`,
    type: ChannelType.GuildText,
    parent: verifyCategoryID,
    permissionOverwrites: [
      {
        id: interaction.guild.id, // @everyone role
        deny: [PermissionsBitField.Flags.ViewChannel], // Deny view permission to everyone
      },
      {
        id: moderatorRole.id, // Moderator role ID found by name
        allow: [PermissionsBitField.Flags.ViewChannel], // Allow view permission for Moderators
      },
    ],
  });

  // Create a button row with the "Close Ticket" button
  const buttonRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Danger) // Red button
    );

  // Send the embed and button to the newly created channel
  await newChannel.send({ content:`${moderatorRole} Verify and Assign Role Accordingly Please Close Ticket upon completion to avoid channel clutter`,embeds: [MemberformEmbed], components: [buttonRow] });

  // Send a confirmation message to the user
  await interaction.reply({ content: "Form has been submitted successfully, and a new channel has been created.", ephemeral: true });
};


