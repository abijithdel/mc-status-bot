const { EmbedBuilder } = require('discord.js');

function baned(interaction, user, reason) {
  const embed = new EmbedBuilder()
    .setTitle('Banned')
    .setDescription(`Banned Invite\`${user}\`. for: \`${reason}\`.`)
    .setColor(0x00ff00) // Optional: Sets the embed color
    .setTimestamp(); // Optional: Adds a timestamp
  interaction.reply({ embeds: [embed] });
}

module.exports = { baned };
