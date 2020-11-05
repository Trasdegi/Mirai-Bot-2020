import { ShardingManager } from 'discord.js';

const manager = new ShardingManager('./mirai_bot.js', { token: process.env.bot_token });

manager.spawn().then(shards => {
  console.log(`Currently ${shards.size} shards active`);
}).catch(console.error);

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));