import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import setting from '@/client/commands/setting';

export default [hello, setting] as const satisfies ReadonlyArray<SlashCommand>;
