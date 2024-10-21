const { TicketPanel } = require("../../events/Embed/ticketPannel");
const { ChannelType } = require("discord.js");

async function TicketSystem(name, title, description, channel, interaction) {
  // Set default title and description if not provided
  title = title || `${name} Support`;
  description = description || 
    "Click on the button below if you wish to talk to the support team. They will respond to your request";

  // Check if the channel is a valid text channel
  if (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews) {
    interaction.reply({
      content: "The selected channel is not a valid text channel.",
      ephemeral: true,
    });
    return;
  }

  // Create the ticket panel
  await TicketPanel(name, title, description, channel, interaction);
  
}

module.exports = { TicketSystem };
