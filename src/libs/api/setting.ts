import type { GetLanguageArgs, UpdateLanguageArgs } from '@/schema/api/setting';
import type { ApiResponse } from '@/types/api';
import type { SettingFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const getLanguage = async ({
  id,
}: GetLanguageArgs): Promise<
  ApiResponse<Pick<SettingFull, 'id' | 'language'>>
> => {
  try {
    const setting = await prisma.setting.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
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

export const updateLanguage = async ({
  id,
  language,
}: UpdateLanguageArgs): Promise<
  ApiResponse<Pick<SettingFull, 'id' | 'language'>>
> => {
  try {
    const setting = await prisma.setting.update({
      where: {
        id,
      },
      data: {
        language,
      },
    });

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
