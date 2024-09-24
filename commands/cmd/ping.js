const { pingEDmessage } = require("../../events/Embed/pinged");
function ping(interaction, client) {
  try {
    const ping = Date.now() - interaction.createdTimestamp;
    const apiPing = Math.round(client.ws.ping);
    pingEDmessage(interaction, ping, apiPing)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { ping };
