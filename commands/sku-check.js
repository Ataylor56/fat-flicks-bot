const { SlashCommandBuilder } = require('discord.js');
const { FetchImages } = require('../api/api');
const { MessageChannel } = require('worker_threads');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sku')
    .setDescription('Returns official Nike images of the desired sku, if available.')
    .addStringOption((option) => option.setName('sku').setDescription('The sku of the desired shoe').setRequired(true)),
    async execute(Bot, interaction) {
        const rawSku = interaction.data.options[0].value;
        const urls = await FetchImages({sku: rawSku, width: 1500, height: 1500})
        return urls;
    },
};