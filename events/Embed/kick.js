const { EmbedBuilder } = require("discord.js");

function kicked(interaction, user, reason) {
  const embed = new EmbedBuilder()
    .setTitle("Kick")
    .setDescription(
      `\`${user.tag}\` has been kicked for the following reason \`${reason}\` .`
    )
    .setColor("DarkOrange") // Optional: Sets the embed color
    .setTimestamp(); // Optional: Adds a timestamp

  if (interaction.deferred || interaction.replied) {
    interaction.editReply({ embeds: [embed] }); // Edit the deferred reply
  } else {
    interaction.reply({ embeds: [embed] }); // Send a new reply
  }
}

module.exports = { kicked };
