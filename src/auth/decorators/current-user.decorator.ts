import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';

import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found inside the request, please check that you are using the AuthGuard',
      );
    }

    if (roles.length === 0) return user;

    for (const rol of roles) {
      if (user.role.includes(rol)) return user;
    }

    throw new ForbiddenException(
      `User ${user.username} doesn't have the required roles [${roles}]`,
    );
  },
);
