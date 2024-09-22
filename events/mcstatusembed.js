const { mcStatus } = require("../commands/cmd/status");
const { onlineEmbed } = require("./Embed/online");
const { offlineEmbed } = require("./Embed/offline");
const { updateEDonline } = require("./Embed/updateonline");
const { updateEDoffline } = require("./Embed/updateoffline");
async function mcStatuseMbed(interaction, version, title, ip, port, channelID, client) {
  try {
    mcStatus(ip, port, version)
      .then((data) => {
        onlineEmbed(title, data, interaction, ip);
        const intervalId = setInterval(async () => {
            try {
                mcStatus(ip, port, version)
                .then((data)=>{
                    updateEDonline(title, data, interaction, ip)
                })
                .catch((err)=>{
                    updateEDoffline(title, ip, interaction)
                })
            } catch (error) {
                console.log(`SERVER ERROR ${error}`)
            }
        },60000)
      })

      .catch((err) => {
        const channel = client.channels.cache.get(channelID);
        offlineEmbed(channel, title, ip)
        
      });
  } catch (error) {
    console.log(`SERVER ERROR ${error}`);
  }
}

module.exports = { mcStatuseMbed };
