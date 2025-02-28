import { UserEntity } from "@bill/database/dist/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) {}

  async findOne(email: string): Promise<UserEntity | null> {
    console.log(1111);
    return {
      email: "nick@126.com",
      id: 1,
      fullname: "",
      password: "changeme",
      avatar: "",
      address: "",
      isActive: false,
    };

    // return this.userRepo.findOne({
    //   where: {
    //     email,
    //   },
    // });
  }
}
