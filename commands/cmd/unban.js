const { unbaned } = require("../../events/Embed/unban");
const { PermissionsBitField } = require("discord.js");

async function unban(interaction, user, reason) {
  try {
    // Check if the bot has permission to unban users
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return await interaction.reply("I don't have permission to unban users.");
    }

    // Check if the user issuing the command has Administrator permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return await interaction.reply("You need to be an administrator to use this command.");
    }

    // Defer the reply while processing
    await interaction.deferReply({ ephemeral: true });

    // Fetch the ban list to find the banned user
    const banList = await interaction.guild.bans.fetch();
    const bannedUser = banList.get(user); // Use user.id instead of the whole user object
    if (!bannedUser) {
      return await interaction.editReply({
        content: "User is not banned or not found!",
        ephemeral: true,
      });
    }

    // Provide a default reason if none is provided
    if (!reason) {
      reason = "No Reason";
    }

    // Unban the user
    await interaction.guild.members.unban(user, reason);

    // Send the unban embed message
    unbaned(interaction, bannedUser.user, reason);

  } catch (error) {
    console.error("Error while trying to unban the user:", error);
    await interaction.editReply({
      content: "There was an error unbanning the user. Please try again.",
      ephemeral: true,
    });
  }
}

module.exports = { unban };
