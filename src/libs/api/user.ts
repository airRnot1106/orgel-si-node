import type { CreateUserArgs } from '@/schema/user';
import type { ApiResponse } from '@/types/api';
import type { UserFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createUser = async ({
  id,
  name,
}: CreateUserArgs): Promise<ApiResponse<UserFull>> => {
  try {
    const existsUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (existsUser) {
      return {
        status: 409,
        error: {
          message: 'User already exists',
        },
      };
    }

    const user = await prisma.user.create({
      data: {
        id,
        name,
      },
    });

    return {
      status: 200,
      data: user,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';

    return {
      status: 500,
      error: {
        message,
      },
    };
  }
};
