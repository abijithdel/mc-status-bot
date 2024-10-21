const { PermissionsBitField } = require("discord.js");
const { STAFFROLE_ID } = require("../config");
const { TicketChannel } = require("./Embed/ticket");

async function Buttons(interaction) {
    // support

    if (interaction.customId === "support") {
        const guild = interaction.guild;
        const supportChannelName = `support-${interaction.user.username}`;
        const category = "support";

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
                });
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
                        {
                            id: STAFFROLE_ID,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                    ],
                });

                TicketChannel(
                    supportChannelName,
                    interaction.user.id,
                    channel,
                    category
                );

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

    //   Report

    if (interaction.customId === "report") {
        const guild = interaction.guild;
        const supportChannelName = `report-${interaction.user.username}`;
        const category = "report";

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
                });
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
                        {
                            id: STAFFROLE_ID,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                    ],
                });

                TicketChannel(
                    supportChannelName,
                    interaction.user.id,
                    channel,
                    category
                );

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

    // Cancel

    if (interaction.customId === "cancel") {
        try {
            const channel = interaction.channel;

            await channel.send(
                "This ticket will be deleted in 5 seconds. Thank you."
            );

            setTimeout(async () => {
                await channel.delete();
            }, 5000);
        } catch (error) {
            console.error("Error deleting the channel:", error);
        }
    }

    // Claim

    if (interaction.customId === "claim") {
        try {
            const member = interaction.member;
            const channel = interaction.channel;

            if (member.roles.cache.has(STAFFROLE_ID)) {
                await channel.setTopic(`Ticket claimed by <@${member.id}>!`);
                await channel.send(`Ticket claimed by <@${member.id}>!`);
            } else {
                await interaction.reply({
                    content: "You do not have permission to claim this ticket.",
                    ephemeral: true,
                });
            }
        } catch (error) {
            console.error("Error claiming the ticket:", error);
            await interaction.reply({
                content: "An error occurred while claiming the ticket.",
                ephemeral: true,
            });
        }
    }
}

module.exports = { Buttons };
