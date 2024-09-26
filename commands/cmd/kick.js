const { PermissionsBitField } = require("discord.js");
const { kicked } = require('../../events/Embed/kick')
async function kick(interaction, user, reason) {
  try {
    const guildMember = await interaction.guild.members.fetch(user.id);

    // Check if bot has permission to kick members
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return await interaction.reply("I don't have permission to kick users.");
    }

    // Check if the command invoker is an administrator
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    // Set default reason if none provided
    if (!reason) {
      reason = 'No Reason';
    }

    // Kick the user
    await guildMember.kick(reason);

    // Reply after successful kick
    kicked(interaction, user, reason)
  } catch (error) {
    console.error("SERVER ERROR:", error);
    
    // Handle cases where the user might not be found
    if (error.code === 10007) {  // Discord API error code for 'Unknown Member'
      await interaction.reply("The specified user is not in the server.");
    } else {
      await interaction.reply("An error occurred while trying to kick the user.");
    }
  }
}

module.exports = { kick };