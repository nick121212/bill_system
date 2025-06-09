import { Role } from "@bill/database";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "@/common/decorators/roles.decorator";
import { UserService } from "@/modules/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    const request = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    const { user } = request;

    const userEntity = await this.userService.getByIdWithError(user?.id, {
      role: true,
      company: true,
    });

    request.userEntity = userEntity;

    if (userEntity.role?.label === Role.Admin) {
      return true;
    }

    const result = requiredRoles.some(
      (role) => userEntity.role?.label === role
    );

    if (!result) {
      return false;
    }

    if ((userEntity.expireDay || 0) < 0) {
      throw new HttpException("账号已过期", 403);
    }

    return true;
  }
}
