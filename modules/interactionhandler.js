const fs = require('fs');
const csv = require('csv-parser');
const Discord = require("discord.js");
const createrole=require("../modules/createrole.js")
const modledeliver=require("../models/VerifyModel.js")
const verifydlvr=require("./submodules/verification.js")
const closeTicketHandler=require("./submodules/channeldeletion.js")
const createproject=require("./createproject.js")
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
    ChannelType,
    PermissionFlagsBits,
} = require("discord.js");



require("dotenv").config();
module.exports = async (interaction) => {
    console.log(interaction.customId)
    if(interaction.isModalSubmit()){
        verifydlvr(interaction)
        console.log("Submitted")
    }
    if (interaction.commandName==='createrole'){
        createrole(interaction)
        return;
    }
    if (interaction.commandName==='createproject'){
        createproject(interaction)
        return;
    }
    if (interaction.commandName==='deletechannel'){
        const modRole = interaction.guild.roles.cache.find(
            (role) => role.name === process.env.Modrolename
        );
        const hasrole = interaction.member.roles.cache.has(modRole.id);
        if(hasrole){

        closeTicketHandler(interaction)
        }
        return;
    }
    if ( interaction.isButton()){
        if (interaction.customId=="DeliverForm"){
            console.log("Deliver Requested")
            modledeliver(interaction)

        }else if(interaction.customId=="close_ticket") {
            closeTicketHandler(interaction)


        }else{
        const role = interaction.guild.roles.cache.get(interaction.customId);
        
        const hasrole = interaction.member.roles.cache.has(role.id);
        console.log(hasrole)
        if(hasrole){
            console.log("removed")
            await interaction.reply({ content: 'The Role Has Been Successfully Removed', ephemeral: true });
            await interaction.member.roles.remove(role);

        }
        else{
            
                const linkButton = new ButtonBuilder()
                  .setLabel('Form for Membership')
                  .setStyle(ButtonStyle.Link)
                  .setURL('https://docs.google.com/forms/d/e/1FAIpQLSe4BUdRs_YQPdS9Kv85Xk8odLKDfvl-itfP1ZXcijvGQBo0Sw/viewform');

                  const VerfiyButton = new ButtonBuilder()
                  .setLabel('Already A Member?Verify')
                  .setStyle(ButtonStyle.Primary)
                  .setCustomId("DeliverForm")
            
                const row = new ActionRowBuilder().addComponents(linkButton,VerfiyButton);
            
            
            await interaction.reply({ content:`You have successfully gained the role of ${role.name},If you also want to be a member of KUCC please follow the instructions below`  ,components: [row], ephemeral: true });
            console.log("add")
            
        await interaction.member.roles.add(role);
        }
       
        

    }
}
    

    
};
