const QRCode = require('qrcode');
const { AttachmentBuilder } = require('discord.js');

async function qrcode(url, interaction) {
    try {
        const buffer = await QRCode.toBuffer(url);  
        const attachment = new AttachmentBuilder(buffer, { name: 'qrcode.png' });

        await interaction.reply({ files: [attachment] });
    } catch (err) {
        console.error(err);
        await interaction.reply("Input Error");
    }
}

module.exports = { qrcode };
