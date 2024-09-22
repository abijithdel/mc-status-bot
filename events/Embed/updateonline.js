const { EmbedBuilder } = require("discord.js"); 

async function updateEDonline(title, status, interaction, ip){
    const updateEMmessage = new EmbedBuilder()
    .setTitle(`:green_circle: Online`)
    .setDescription(`${title}`)
    .setThumbnail(
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
    )
    .setColor("DarkGreen")
    .addFields(
      {
        name: "Players",
        value: `${status.players.online}/${status.players.max}`,
        inline: false,
      },
      {
        name: "Version",
        value: `${status.version.name}`,
        inline: false,
      },
      {
        name: "Server IP",
        value: `${ip}`,
        inline: false,
      }
    )
    .setTimestamp()
    .setFooter({ text: `${title}` });

    await interaction.editReply({ embeds: [updateEMmessage] });
}

module.exports = { updateEDonline }