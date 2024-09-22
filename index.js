const { Client, Events, GatewayIntentBits,ActivityType } = require('discord.js');
const config = require('./config')
const token = config.TOKEN
const { slashCommands } = require('./commands/utilities/slashCommands')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity({
        name:'Servers',
        type:ActivityType.Watching
    })
});

slashCommands(client)

client.login(token);