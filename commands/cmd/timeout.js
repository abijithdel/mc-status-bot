const { timeouted } = require("../../events/Embed/timeout");
const { PermissionsBitField } = require("discord.js");

async function timeoutf(interaction, member, duration) {
  try {
    // Fetch the target guild member
    const guildMember = await interaction.guild.members.fetch(member.id).catch(() => null);

    // Check if the user exists
    if (!guildMember) {
      return await interaction.reply({
        content: "The specified user is not in the server.",
        ephemeral: true,
      });
    }

    // Check if the bot has permission to timeout members
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return await interaction.reply("I don't have permission to timeout users.");
    }

    // Check if the command issuer has Administrator permissions
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    // Prevent self-timeout
    if (guildMember.id === interaction.user.id) {
      return await interaction.reply({
        content: "You cannot timeout yourself.",
        ephemeral: true,
      });
    }
    if (duration){
      duration = 60 * 1000
    }

    // Check role hierarchy: prevent timeout of users with higher roles than the bot
    if (guildMember.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
      return await interaction.reply({
        content: "I cannot timeout this user as they have a higher or equal role than mine.",
        ephemeral: true,
      });
    }

    // Check role hierarchy: prevent timeout of users with higher roles than the issuer
    if (guildMember.roles.highest.position >= interaction.member.roles.highest.position) {
      return await interaction.reply({
        content: "You cannot timeout someone with a higher or equal role than yours.",
        ephemeral: true,
      });
    }

    // Check if the member is already timed out
    if (guildMember.communicationDisabledUntilTimestamp) {
      return await interaction.reply({
        content: `${guildMember.user.username} is already timed out.`,
        ephemeral: true,
      });
    }


    // Check that the duration does not exceed the maximum timeout limit (28 days)
    const maxTimeout = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
    if (duration > maxTimeout) {
      return await interaction.reply({
        content: `The maximum timeout duration is 28 days.`,
        ephemeral: true,
      });
    }

    // Apply the timeout
    await guildMember.timeout(duration, `Timeout issued by ${interaction.user.tag}`);

    // Send custom embed/message after the timeout
    await timeouted(interaction, member, duration);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    await interaction.reply("An error occurred while trying to timeout the user.");
  }
}

module.exports = { timeoutf };
