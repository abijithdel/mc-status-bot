const { EmbedBuilder } = require("discord.js"); 

async function offlineEmbed(channel, title, ip){
    const offlineEDmessage = new EmbedBuilder()
    .setTitle(`:red_circle: Offline`)
    .setDescription(`${title}`)
    .setThumbnail(
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
    )
    .setColor("Red")
    .addFields(
      {
        name: "Players",
        value: `NA`,
        inline: false,
      },
      {
        name: "Version",
        value: `NA`,
        inline: false,
      },
      {
        name: "Server IP",
        value: `${ip}`,
        inline: false,
      }
    )
    .setTimestamp()
    .setFooter({ text: `Title` });

    await channel.send({ embeds: [offlineEDmessage] });
}

module.exports = { offlineEmbed } 