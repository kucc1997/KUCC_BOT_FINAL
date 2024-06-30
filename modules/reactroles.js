const fs = require('fs');
const csv = require('csv-parser');
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
    EmbedBuilder,
    ChannelType,
    PermissionFlagsBits,
} = require("discord.js");

async function readCSVAndPopulateArrays(filePath) {
    let IDs = [];
    let LABELS = [];
    let roles = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const [LABEL, ID] = Object.values(data);
                LABELS.push(LABEL);
                IDs.push(ID);
            })
            .on('end', () => {
                for (let i = 0; i < IDs.length; i++) {
                    roles.push({
                        id: IDs[i],
                        label: LABELS[i]
                    });
                }
                
                resolve(roles);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

require("dotenv").config();
module.exports = async (client) => {
    const channel = client.channels.cache.get(process.env.ReactRole);
    const messageold = await channel.messages.fetch(process.env.MessageId);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (user.bot) return; // Ignore reactions from bots

        const roles = await readCSVAndPopulateArrays("./csv/roles.csv");
        

        const { message, emoji } = reaction;
        const guild = message.guild;
        const member = await guild.members.fetch(user.id);

        if (message.id == messageold.id) { // Replace 'YOUR_MESSAGE_ID' with the actual message ID
            for (let i = 0; i < roles.length; i++) {
                if (emoji.name == roles[i].label) {
                    await member.roles.add(roles[i].id);
                }
            }
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (user.bot) return; // Ignore reactions from bots
    
        const roles = await readCSVAndPopulateArrays("./csv/roles.csv");
        const { message, emoji } = reaction;
        const guild = message.guild;
        const member = await guild.members.fetch(user.id);
    
        if (message.id === messageold.id) { // Replace 'messageold.id' with the actual message ID
            for (let i = 0; i < roles.length; i++) {
                if (emoji.name === roles[i].label) {
                    const roleId = roles[i].id;
                    const roleToRemove = guild.roles.cache.get(roleId);
                    if (roleToRemove && member.roles.cache.has(roleId)) {
                        await member.roles.remove(roleId);
                        
                    }
                }
            }
        }
    });
    
};
