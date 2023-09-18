const {Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const Commands = [];
const { FetchImages } = require('./api/api');
const Constants = require('./constants.js');

const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

Bot.on('ready', async () => {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    Bot.commands = [];
    for (const file of commandFiles) {
        const command = require(`${commandsPath}/${file}`);
        Commands.push(command);
        await Bot.application.commands.create(command.data);
    }
    console.log(Commands);
});


Bot.ws.on('INTERACTION_CREATE', async (interaction) => {
    const CMDFile = Commands.find(
		(cmd) => cmd.data.name.toLowerCase() === interaction.data.name.toLowerCase(),
	);
	if (CMDFile) {
        switch (CMDFile.data.name) {
            case 'sku': {
                const urls = await CMDFile.execute(Bot, interaction);
                //const channel = Bot.channels.cache.get(interaction.channel.id);
                const channel = await Bot.channels.fetch(interaction.channel.id);
                const message = await channel.messages.fetch(interaction.channel.last_message_id)
                const result = await message.reply(...urls);
                //console.log(result);
                
                //const user = await Bot.users.fetch(interaction.member.user.id)
                //const user = await Bot.users.fetch(interaction.member.user.id);
                //const result = await user.reply(urls)
                //const result = await user.send(urls);
                
                //console.log(result);
            }
            default: {
                await CMDFile.execute(Bot, interaction);
            }
    }
}});

Bot.login(Constants.token);



/*
client.on('interactionCreate', async (interaction) => {
    console.log(interaction)
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});
*/

// client.on('ready', () => {
//     Constants.skuList.forEach(async (sku) => {
//         const images = await FetchImages({sku: sku, width: 1500, height: 1500})
//         images.forEach((image) => {
//             client.channels.cache.get(Constants.picsChannel).send(image.url);
//         }); 
//     })
// });


Bot.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('pong');
    }
});