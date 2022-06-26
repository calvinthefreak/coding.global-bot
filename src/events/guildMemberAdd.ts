import type { GuildMember } from 'discord.js';
import { updateUserCount } from '../utils/updateUserCount';

export default {
  name: 'guildMemberAdd',
  once: false,
  async execute(member: GuildMember) {
    await updateUserCount(member);
  },
};
