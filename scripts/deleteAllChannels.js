const { Client, TextChannel, ClientOptions, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();

const clientOptions = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};
const client = new Client(clientOptions);

client.on('ready', async() => {
  console.log(`Logged in as ${client.user.tag}`);
  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
  const channels = await guild.channels.fetch();
  channels.forEach(channel => {
    channel.delete();
  });
  console.log(`Deleted ${channels.length}"`);
});

async function deleteAllChannels() {
  try {
    client.login(process.env.DISCORD_BOT_TOKEN);
  } catch (error) {
    console.error(`Error deleting channels ${error}`);
  }
}
const args = process.argv.slice(2);
const apiHost = args[0];

deleteAllChannels();
