import { SlashCommandBuilder } from '@discordjs/builders';
import type { CacheType, CommandInteraction } from 'discord.js';
import { askChatGPT } from '../utils/chatgpt/askChatGPT.js';
import { chunkedSend } from '../utils/messages/chunkedSend.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('talk to ai')
    .addStringOption((option) =>
      option
        .setName('text')
        .setDescription('ask ai a question')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction<CacheType>) {
    // deferReply if it takes longer then usual

    await interaction.deferReply();

    const user = interaction.user;

    const text = interaction.options.get('text')?.value as string;

    const content = await askChatGPT({ interaction, user, text });

    if (!content) return await interaction.editReply('User not Found');

    return await chunkedSend({ content, interaction });
  },
};
