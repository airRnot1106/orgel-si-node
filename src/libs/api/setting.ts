import type { GetLanguageArgs } from '@/schema/api/setting';
import type { ApiResponse } from '@/types/api';
import type { SettingFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const getLanguage = async ({
  id,
}: GetLanguageArgs): Promise<ApiResponse<Pick<SettingFull, 'language'>>> => {
  try {
    const setting = await prisma.setting.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
      },
    });

    if (!setting) {
      return {
        status: 404,
        error: {
          message: 'Setting not found',
        },
      };
    }

    return {
      status: 200,
      data: setting,
    };
  } catch (e) {
    const message = e instanceof Error ? e : 'Internal Server Error';

    return {
      status: 500,
      error: {
        message,
      },
    };
  }
};
