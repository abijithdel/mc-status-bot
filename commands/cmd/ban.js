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

    // Check if the user exists
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

    // Prevent banning users with higher roles or permissions
    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply({
        content: "You cannot ban an administrator.",
        ephemeral: true,
      });
    }

    // If no reason is provided, set a default reason
    if (!reason) {
      reason = "No reason provided";
    }

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
