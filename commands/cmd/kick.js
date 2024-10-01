const { PermissionsBitField } = require("discord.js");
const { kicked } = require('../../events/Embed/kick');

async function kick(interaction, user, reason) {
  try {
    // Fetch the target user from the guild
    const guildMember = await interaction.guild.members.fetch(user.id).catch(() => null);

    // Check if the user exists in the guild
    if (!guildMember) {
      return await interaction.reply({
        content: "The specified user is not in the server.",
        ephemeral: true,
      });
    }

    // Check if bot has permission to kick members
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return await interaction.reply("I don't have permission to kick users.");
    }

    // Check if the command invoker has Administrator permissions
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    // Prevent self-kicking
    if (guildMember.id === interaction.user.id) {
      return await interaction.reply({
        content: "You cannot kick yourself.",
        ephemeral: true,
      });
    }

    // Check if the member has a higher role than the bot
    if (guildMember.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
      return await interaction.reply({
        content: "I cannot kick this user as they have a higher or equal role than me.",
        ephemeral: true,
      });
    }

    // Check if the member has a higher role than the command invoker
    if (guildMember.roles.highest.position >= interaction.member.roles.highest.position) {
      return await interaction.reply({
        content: "You cannot kick someone with a higher or equal role than yours.",
        ephemeral: true,
      });
    }

    // Set default reason if none provided and limit the length of the reason
    reason = reason ? reason.slice(0, 512) : 'No Reason Provided';

    // Kick the user
    await guildMember.kick(reason);

    // Send custom embed message after a successful kick
    await kicked(interaction, user, reason);

  } catch (error) {
    console.error("SERVER ERROR:", error);

    // Handle specific errors
    if (error.code === 10007) {  // Discord API error code for 'Unknown Member'
      await interaction.reply({
        content: "The specified user is not in the server.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "An error occurred while trying to kick the user.",
        ephemeral: true,
      });
    }
  }
}

module.exports = { kick };
