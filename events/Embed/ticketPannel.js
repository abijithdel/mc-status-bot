const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

async function TicketPanel(name, title, description, channel, interaction) {
    // Create buttons
    const cancel = new ButtonBuilder()
        .setCustomId("support") // Use a simpler custom ID
        .setLabel("Support")
        .setStyle(ButtonStyle.Danger);

    const claim = new ButtonBuilder()
        .setCustomId("report") // Use a simpler custom ID
        .setLabel("Report")
        .setStyle(ButtonStyle.Success);

    // Create embed
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor("DarkOrange")
        .setFooter({ text: name });

    // Create action row and add buttons
    const row = new ActionRowBuilder().addComponents(cancel, claim);

    // Send the embed with buttons to the specified channel
    try {
        await channel.send({ embeds: [embed], components: [row] });
    } catch (error) {
        console.error("Failed to send the ticket panel:", error);
    }
}

module.exports = { TicketPanel };
