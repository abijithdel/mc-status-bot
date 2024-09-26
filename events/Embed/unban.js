const { EmbedBuilder } = require('discord.js');

function unbaned(interaction, user, reason) {
  const embed = new EmbedBuilder()
    .setTitle('Unban')
    .setDescription(`\`${user.tag}\` has been unbanned for: \`${reason}\`.`)
    .setColor(0x00ff00) // Optional: Sets the embed color
    .setTimestamp(); // Optional: Adds a timestamp

  interaction.editReply({ embeds: [embed] });
}

module.exports = { unbaned };
