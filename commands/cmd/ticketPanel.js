const { TicketPanel } = require("../../events/Embed/ticketPannel");
const { ChannelType, PermissionsBitField } = require("discord.js");

async function TicketSystem(name, title, description, channel, interaction) {
    const member = interaction.member;
    if (member.permissions.has(PermissionsBitField.Flags.ManageGuild) || member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        title = title || `${name} Support`;
        description = description ||
            "Click on the button below if you wish to talk to the support team. They will respond to your request";

        if (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildNews) {
            interaction.reply({
                content: "The selected channel is not a valid text channel.",
                ephemeral: true,
            });
            return;
        }

        await TicketPanel(name, title, description, channel, interaction);
    }else{
        await interaction.reply({content: "You do not have permission to Manage Guild or administrator privileges.",ephemeral: true,});
    }
}

module.exports = { TicketSystem };

