import { Get, Injectable, Req, UseGuards } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "@bill/database/dist/entities";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
