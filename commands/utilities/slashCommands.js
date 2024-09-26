const { mcStatuseMbed } = require("../../events/mcstatusembed");
const { ping } = require('../cmd/ping')
const { ban } = require('../cmd/ban')
const { unban } = require('../cmd/unban')
const { timeoutf } = require('../cmd/timeout')
const { kick } = require('../cmd/kick')
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

    if (commandName == "ping"){
      ping(interaction, client)
    }

    if (commandName == 'ban') {
      const user = options.getUser('user')
      const reason = options.getString('reason')
      ban(interaction,user,reason)
    }

    if (commandName == 'unban'){
      const user = options.getString('user')
      const reason = options.getString('reason')
      unban(interaction, user ,reason)
    }
    if (commandName == 'timeout'){
      const user = options.getUser('user')
      const duration = options.getNumber('duration')
      timeoutf(interaction, user, duration)
    }
    if (commandName == 'kick'){
      const user = options.getUser('user')
      const reason = options.getString('reason')
      kick(interaction,user,reason)
    }
  });
}

module.exports = { slashCommands };
