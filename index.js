const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config');
const token = config.TOKEN;
const { slashCommands } = require('./commands/utilities/slashCommands');
const { activity } = require('./events/activity');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    try {
        // Initial update of member count
        let memberCount = await activity(client);
        client.user.setActivity({
            name: `${memberCount} Members`,
            type: ActivityType.Watching,
        });

        // Update the member count every minute
        setInterval(async () => {
            memberCount = await activity(client);
            client.user.setActivity({
                name: `${memberCount} Members`,
                type: ActivityType.Watching,
            });
        }, 60000);
        
    } catch (error) {
        console.log('Error fetching member count:', error);
    }
});

slashCommands(client);

client.login(token);
