import { Client, TextChannel, ClientOptions, GatewayIntentBits, ChannelType } from 'discord.js';

const clientOptions: ClientOptions = {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  };

const client = new Client(clientOptions);
client.login(process.env.DISCORD_BOT_TOKEN);

export default {
    afterCreate(event) {
        const { result } = event;
        console.log('after create: ' + JSON.stringify(result))
        const channelNamePre = result.startDate + ' ' + result.type + ' ' + result.opponent
        const channelName = channelNamePre.replace(/\W+/g, '-').toLowerCase();
        const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
        if (!guild) return console.error('Unable to find guild.');
        guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            topic: 'a description',
        })
        .then((channel: TextChannel) => console.log(`Created channel ${channel.name}`))
        .catch(console.error);
    },
};
