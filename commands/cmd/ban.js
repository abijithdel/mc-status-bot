const { baned } = require('../../events/Embed/ban')
async function ban(interaction, user, reason) {
  try {
    const member = await interaction.guild.members.fetch(user.id);
    await member.ban({ reason });

    if (!user) {
      return interaction.editReply({
        content: "User not found!",
        ephemeral: true,
      });
    }

    if (!reason) {
      reason = "No Reason";
    }

    baned(interaction, user, reason) 
  } catch (error) {
    console.log("SERVER ERROR")
  }
}

module.exports = { ban };
