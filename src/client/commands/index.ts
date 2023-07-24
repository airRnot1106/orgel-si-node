import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import play from '@/client/commands/play';
import resume from '@/client/commands/resume';
import setting from '@/client/commands/setting';

export default [
  hello,
  setting,
  play,
  resume,
] as const satisfies ReadonlyArray<SlashCommand>;
