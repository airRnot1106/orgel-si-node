import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';

export default [hello] as const satisfies ReadonlyArray<SlashCommand>;
