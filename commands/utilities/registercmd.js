const {
  REST,
  Routes,
  ApplicationCommandOptionType,
} = require("discord.js");
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
            value: "java"
          },
          {
            name: "Bedrock",
            value: "bedrock"
          }
        ]
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
