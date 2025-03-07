import { UserEntity } from "@bill/database/dist/entities";
import {
  Get,
  Injectable,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PERMISSION_LIST } from "@/assets";
import { UserService } from "@/modules/user/user.service";

import { AuthRequest } from "./auth.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
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

    (user as any).permissions = PERMISSION_LIST;

    const payload = { sub: user.id, username: user.fullname };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: "",
      user,
    };
  }
}
