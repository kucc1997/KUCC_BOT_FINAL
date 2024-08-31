const Discord = require("discord.js");
const {
    Client,
    IntentsBitField,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
  } = require("discord.js");
module.exports = async (interaction) => {
    const dmessage ="Below is the KUCC Verification Form \nPlease Fill the Form with your KUCC details";
      const activationbuttonmember = new ActionRowBuilder()
      activationbuttonmember.components.push(new ButtonBuilder().setCustomId('Send KUCC Form').setLabel('Press to Fill Form').setStyle(ButtonStyle.Primary))
      await interaction.editReply({
        content: dmessage,
        components: [activationbuttonmember]
      });


}