const { mcStatuseMbed } = require("../../events/mcstatusembed");
function slashCommands(client) {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName == "status") {
      const version = options.getString("version");
      const title = options.getString("title");
      const serverIP = options.getString("ip");
      const serverPort = options.getInteger("port");
      const channelID = interaction.channelId
      mcStatuseMbed(interaction,version,title,serverIP,serverPort,channelID, client);
    }
  });
}

module.exports = { slashCommands };
