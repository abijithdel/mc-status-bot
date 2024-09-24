const { EmbedBuilder } = require('discord.js');

function pingEDmessage(interaction, ping, apiPing) {
  const embed = new EmbedBuilder()
    .setTitle('🏓 Pong!')
    .setDescription(`Latency is \`${ping}ms\`. API Latency is \`${apiPing}ms\`.`)
    .setColor(0x00ff00) // Optional: Sets the embed color
    .setTimestamp(); // Optional: Adds a timestamp

  // Send the embed as a reply to the interaction
  interaction.reply({ embeds: [embed] });
}

module.exports = { pingEDmessage };
