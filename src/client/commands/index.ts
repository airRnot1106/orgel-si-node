import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import history from '@/client/commands/history';
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
  history,
] as const satisfies ReadonlyArray<SlashCommand>;
