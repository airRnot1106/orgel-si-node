import type { SettingGetQuery } from '@/schema/api/setting';
import type { ApiResponse } from '@/types/api';
import type { SettingFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const getSetting = async ({
  id,
}: SettingGetQuery): Promise<ApiResponse<SettingFull>> => {
  try {
    const setting = await prisma.setting.findUnique({
      where: {
        id,
      },
      include: {
        guild: true,
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
