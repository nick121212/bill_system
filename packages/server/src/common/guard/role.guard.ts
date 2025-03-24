import { Role } from "@bill/database";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "@/common/decorators/roles.decorator";
import { UserService } from "@/modules/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const userEntity = await this.userService.getByIdWithError(user?.id, {
      role: true,
      company: true,
    });

    context.switchToHttp().getRequest().userEntity = userEntity;

    return requiredRoles.some((role) => userEntity.role?.label === role);
  }
}
