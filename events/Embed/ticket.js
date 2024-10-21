const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

async function TicketChannel(channelName, User, channel, category) {
    // Create buttons
    const cancel = new ButtonBuilder()
        .setCustomId("cancel") // Use a simpler custom ID
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Danger);

    const claim = new ButtonBuilder()
        .setCustomId("claim") // Use a simpler custom ID
        .setLabel("Claim")
        .setStyle(ButtonStyle.Success);

    // Create embed
    const embed = new EmbedBuilder()
        .setTitle(channelName)
        .setDescription(`<@${User}>! has created a ticket under ${category} category.`)
        .setColor("DarkOrange")
        .setTimestamp()
        .setFooter({ text: channelName });

    // Create action row and add buttons
    const row = new ActionRowBuilder().addComponents(cancel, claim);

    // Send the embed with buttons to the specified channel
    try {
        await channel.send({ embeds: [embed], components: [row] });
    } catch (error) {
        console.error("Failed to send the ticket panel:", error);
    }
}

module.exports = { TicketChannel };
