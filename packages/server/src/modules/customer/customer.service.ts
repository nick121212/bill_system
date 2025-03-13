import { Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { CustomerEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";

import { CustomerQuery, CustomerRequest } from "./customer.interface";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity) private repo: Repository<CustomerEntity>,
  ) {}

  async all(
    query: CustomerQuery,
    withRelation = false
  ): Promise<{ rows: CustomerEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
      },
      relations: {
        // menus: true,
      },
      loadRelationIds: true,
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getById(
    id?: number,
    loadRelationIds = false
  ): Promise<CustomerEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOne({
      where: {
        id,
      },
      loadRelationIds: loadRelationIds,
    });

    return data || undefined;
  }

  async create(body: CustomerRequest): Promise<CustomerEntity> {
    const { ...rest } = body;
    const customer = new CustomerEntity().extend({
      ...rest,
    });

    // role.menus = await this.repo.manager.find(MenuEntity, {
    //   where: {
    //     id: In(menus || []),
    //   },
    // });

    return await this.repo.save(customer);
  }

  async update(id: number, body: CustomerRequest): Promise<CustomerEntity> {
    const customer = await this.getById(id);
    const {  ...rest } = body;

    if (!customer) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          entity: "RoleEntity",
        }
      );
    }

    customer.extend(rest);

    return this.repo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.getById(id);

    if (!customer) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.softRemove(customer);
  }
}
