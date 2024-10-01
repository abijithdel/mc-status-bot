const { baned } = require('../../events/Embed/ban');
const { PermissionsBitField } = require('discord.js');

async function ban(interaction, user, reason) {
  try {
    // Check if the bot has permission to ban members
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return await interaction.reply("I don't have permission to ban users.");
    }

    // Check if the person issuing the command has the Administrator permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    // Fetch the target member
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      return await interaction.reply({
        content: "User not found!",
        ephemeral: true,
      });
    }

    // Prevent banning yourself
    if (member.id === interaction.user.id) {
      return await interaction.reply({
        content: "You cannot ban yourself.",
        ephemeral: true,
      });
    }

    // Check if the member has a higher role than the bot
    if (member.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
      return await interaction.reply({
        content: "I cannot ban this user as they have a higher or equal role than mine.",
        ephemeral: true,
      });
    }

    // Prevent banning administrators or users with higher roles than the command issuer
    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return await interaction.reply({
        content: "You cannot ban someone with a higher or equal role than yours.",
        ephemeral: true,
      });
    }

    // If no reason is provided, set a default reason
    reason = reason ? reason.slice(0, 512) : "No reason provided"; // Limit reason length to 512 characters

    // Ban the member
    await member.ban({ reason });

    // Optionally, send the ban embed or custom response
    await baned(interaction, user, reason); // Assuming this sends some custom message or log

  } catch (error) {
    console.error("SERVER ERROR:", error);
    await interaction.reply("An error occurred while trying to ban the user.");
  }
}

module.exports = { ban };