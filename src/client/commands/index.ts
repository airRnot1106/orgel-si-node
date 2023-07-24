import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import play from '@/client/commands/play';
import resume from '@/client/commands/resume';
import setting from '@/client/commands/setting';
import skip from '@/client/commands/skip';

export default [
  hello,
  setting,
  play,
  skip,
  resume,
] as const satisfies ReadonlyArray<SlashCommand>;
