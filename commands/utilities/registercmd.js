const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config");

// Define the command
const commands = [
  {
    name: "status",
    description: "Get the server status message",
    options: [
      {
        name: "version", // Changed from "Jave Or Bedrock" to "version"
        description: "Select Java or Bedrock",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "Java",
            value: "java",
          },
          {
            name: "Bedrock",
            value: "bedrock",
          },
        ],
      },
      {
        name: "title",
        description: "Message title",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "ip",
        description: "Enter your server IP",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "port",
        description: "Enter your server port",
        type: ApplicationCommandOptionType.Integer, // Changed to String for consistency
      },
    ],
  },
  {
    name: "ping",
    description: "Check bot ping",
  },
  {
    name: "ban",
    description: "Ban User",
    options: [
      {
        name: "user",
        description: "Select a User",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "reason",
        description: "reason of the ban",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: "unban",
    description: "unban a member",
    options: [
      {
        name: "user",
        description: "user to unban. (username or user ID)",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "reason",
        description: "reason of the unban",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: "timeout",
    description: "Timeout User",
    options: [
      {
        name: "user",
        description: "The User to Timeout",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "duration",
        description: "How long they should be timed out for",
        type: ApplicationCommandOptionType.Number,
        required: false,
        choices: [
          {
            name: "60 secs",
            value: 60 * 1000,
          },
          {
            name: "10 mins",
            value: 10 * 60 * 100,
          },
          {
            name: "1 day",
            value: 24 * 60 * 60 * 1000,
          },
          {
            name: "1 week",
            value: 7 * 24 * 60 * 60 * 1000,
          },
        ],
      },
    ],
  },
  {
    name: "kick",
    description: "Kick a User",
    options: [
      {
        name: "user",
        description: "the user to kick",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "reason", 
        description: "reason of the kick",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name:'help',
    description: 'View Help'
  },
  {
    name: 'about',
    description: 'About Me'
  },
  {
    name: 'qrcode',
    description: 'Create QRCode',
    options: [
      {
        name:'url',
        description: 'Enter URL',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },

];

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

(async () => {
  try {
    console.log("Registering commands...");

    await rest.put(Routes.applicationCommands(config.BOTID), {
      body: commands,
    });

    console.log("Commands registered successfully.");
  } catch (error) {
    console.error(`Error registering commands: ${error}`);
  }
})();
