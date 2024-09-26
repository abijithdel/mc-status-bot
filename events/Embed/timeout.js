const { EmbedBuilder } = require('discord.js');

function timeouted(interaction, user, time) {
  const embed = new EmbedBuilder()
    .setTitle('Timeout')
    .setDescription(`\`${user.tag}\` has been timed out for: \`${time}\` seconds.`)
    .setColor('DarkOrange') // Optional: Sets the embed color
    .setTimestamp(); // Optional: Adds a timestamp

  interaction.reply({ embeds: [embed] });
}

module.exports = { timeouted };
