import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode, PermissionType } from "@bill/database";
import { TemplateEntity } from "@bill/database/dist/entities";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";

import { TemplateBodyRequest, TemplateQuery } from "./template.interface";

@Injectable()
export class TemplateService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(TemplateEntity) private repo: Repository<TemplateEntity>,
    private em: EntityManager
  ) {}

  async all(query: TemplateQuery): Promise<{
    count: number;
    rows: TemplateEntity[];
  }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip_c,
      take: query.take_c,
      where: {
        ...query.where_c,
      },
    });

    return {
      count,
      rows,
    };
  }

  async getById(id?: number): Promise<TemplateEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async create(body: TemplateBodyRequest): Promise<TemplateEntity> {
    const child = new TemplateEntity().extend({
      ...body,
    });

    return await this.repo.save(child);
  }

  async update(id: number, body: TemplateBodyRequest): Promise<TemplateEntity> {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    child.desc = body.desc;
    child.name = body.name;

    return this.repo.save(child);
  }

  async remove(id: number) {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.softRemove(child);
  }
}
