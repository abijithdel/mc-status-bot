const { PermissionsBitField } = require('discord.js');

async function say(message, interaction) {
  try {
    const member = interaction.member;
    if (member.permissions.has(PermissionsBitField.Flags.ManageMessages) || member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await interaction.reply(message)
    } else {
        await interaction.reply({content: "You do not have permission to manage messages or administrator privileges.",ephemeral: true,});
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { say };
