const { EmbedBuilder } = require('discord.js');

function Embed(title, description, time, footer, color, interaction) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
    if (time) {
        embed.setTimestamp();
    }
    if (footer) {
        embed.setFooter({ text: footer })
    }

    interaction.reply({ embeds: [embed] });
}

module.exports = { Embed };
