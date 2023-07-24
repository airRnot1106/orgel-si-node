import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import play from '@/client/commands/play';
import setting from '@/client/commands/setting';

export default [
  hello,
  setting,
  play,
] as const satisfies ReadonlyArray<SlashCommand>;
