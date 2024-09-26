const { EmbedBuilder } = require('discord.js');

function baned(interaction, user, reason) {
  const embed = new EmbedBuilder()
    .setTitle('Banned')
    .setDescription(`Banned \`${user.tag}\` for: \`${reason}\`.`)
    .setColor('Red')
    .setTimestamp();

  // Check if the interaction has already been deferred or replied
  if (interaction.deferred || interaction.replied) {
    interaction.editReply({ embeds: [embed] }); // Edit the deferred reply
  } else {
    interaction.reply({ embeds: [embed] }); // Send a new reply
  }
}

module.exports = { baned };
