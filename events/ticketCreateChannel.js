const { PermissionsBitField } = require("discord.js");

async function TicketSupportButton(interaction) {
    if (interaction.customId === "support") {
        const guild = interaction.guild; 
        const supportChannelName = `support-${interaction.user.username}`; 

        try {
            if (
                !interaction.guild.members.me.permissions.has(
                    PermissionsBitField.Flags.ManageChannels
                )
            ) {
                return interaction.reply({
                    content: "I don't have permission to manage channels.",
                    ephemeral: true,
                });
            }

            const existingChannel = guild.channels.cache.find(
                (channel) => channel.name === supportChannelName
            );

            if (existingChannel) {
                return interaction.reply({
                    content: `A support channel already exists: <#${existingChannel.id}>`,
                    ephemeral: true,
                })
            } else {
                const channel = await guild.channels.create({
                    name: supportChannelName,
                    type: 0, 
                    permissionOverwrites: [
                        {
                            id: interaction.user.id, 
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                        {
                            id: guild.roles.everyone, 
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                });

                channel.send(
                    `Welcome to your support channel, <@${interaction.user.id}>! How can I assist you today?`
                );

                // Acknowledge the button interaction
                await interaction.reply({
                    content: `Your support channel has been created: <#${channel.id}>`,
                    ephemeral: true,
                });
            }


        } catch (error) {
            console.error("Error creating support channel:", error);
            await interaction.reply({
                content: "There was an error creating your support channel.",
                ephemeral: true,
            });
        }
    }
}

module.exports = { TicketSupportButton };
