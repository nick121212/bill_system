import { randomUUID } from "crypto";
import { UserEntity } from "@bill/database/dist/entities";
import {
  Get,
  Injectable,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { PERMISSION_LIST } from "@/assets";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import { RedisService } from "@/modules/redis/redis.service";
import { RoleService } from "@/modules/role/role.service";
import { UserService } from "@/modules/user/user.service";

import { AuthRequest } from "./auth.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email, pass);

    if (user) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(body: AuthRequest) {
    const user = await this.usersService.findOne(body.username, body.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const role = await this.roleService.getByIdWithPermission(user.role.id);

    (user as any).permissions = PERMISSION_LIST;
    (user as any).permissions = role.menus;

    return await this.generateAccessToken(user);
  }

  async signOut(userId: string): Promise<void> {
    return this.redisService.delete(`user-${userId}`);
  }

  async generateAccessToken(
    user: UserEntity
  ): Promise<{ accessToken: string; user?: UserEntity }> {
    const tokenId = randomUUID();

    await this.redisService.insert(`user-${user.id}`, tokenId);

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.configService.get("jwt").secret,
      }
    );

    return { accessToken, user };
  }
}
