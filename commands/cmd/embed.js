const { Embed } = require("../../events/Embed/embed");
const { PermissionsBitField } = require("discord.js");

async function embedMessage(title, description, time, footer, color, interaction) {
    const member = interaction.member;

    if (
        member.permissions.has(PermissionsBitField.Flags.ManageMessages) ||
        member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
  
        if (!footer) {
            footer = "Embed"; 
        }

        Embed(title, description, time, footer, color, interaction);
    } else {
        await interaction.reply({
            content: "You do not have permission to manage messages or administrator privileges.",
            ephemeral: true,
        });
    }
}

module.exports = { embedMessage };