const { timeouted } = require("../../events/Embed/timeout");
const { PermissionsBitField } = require("discord.js");

async function timeoutf(interaction, member, duration) {
  try {
    const guildMember = await interaction.guild.members.fetch(member.id);
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return await interaction.reply("I don't have permission to timeout users.");
    }
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    if (guildMember.communicationDisabledUntilTimestamp) {
      return await interaction.reply(`${guildMember.user.username} is already timed out.`);
    }

    if (!duration){
      duration = 60 * 1000
    }
    await guildMember.timeout(duration, `Timeout issued by ${interaction.user.tag}`);

    await timeouted(interaction, member, duration); 
  } catch (error) {
    console.error("SERVER ERROR:", error);
    await interaction.reply("An error occurred while trying to timeout the user.");
  }
}

module.exports = { timeoutf };
