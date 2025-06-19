import type { Repository } from 'typeorm';
import { ApiStatusCode } from '@bill/database';
import { ChargeEntity, UserEntity } from '@bill/database/dist/entities';
import { Global, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiException } from '@/common/exception/api.exception';
import { CustomerService } from '@/modules/customer/customer.service';

import type { ChargeQuery, ChargeRequest } from './charge.interface';

@Injectable()
@Global()
export class ChargeService {
  constructor(
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
    @InjectRepository(ChargeEntity)
    private repoCharge: Repository<ChargeEntity>,
    private customerService: CustomerService,
  ) {}

  async all(
    query: ChargeQuery,
  ): Promise<{ rows: ChargeEntity[]; count: number }> {
    const { user, ...rest } = query?.where || {};
    const [rows, count] = await this.repoCharge.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
        user: user?.id ? { id: ~~user.id } : undefined,
      },
      relations: {
        user: true,
        customer: true,
      },
      select: ['user', 'customer'],
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async getById(id?: number): Promise<ChargeEntity | null> {
    return await this.repoCharge.findOne({
      where: { id },
    });
  }

  async getByIdWithError(id?: number): Promise<ChargeEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const charge = await this.getById(id);

    if (!charge) {
      throw new ApiException(
        'can not find recoed',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: 'ChargeEntity',
        },
      );
    }

    return charge;
  }

  async create(body: ChargeRequest): Promise<ChargeEntity> {
    const { customerId, balance, extra } = body;
    const customer = await this.customerService.getByIdWithError(customerId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const data = new ChargeEntity().extend({
      balance,
      extra,
      // customerId: customerId,
      customer,
      companyId: this.request.userEntity.company?.id,
      userId: this.request.userEntity.id,
    });

    if (!customer.balance) {
      customer.balance = 0;
    }

    customer.balance += balance;
    customer.balance += extra;

    await this.customerService.updateBalance(customerId, customer.balance);

    return await this.repoCharge.save(data);
  }

  async remove(id: number): Promise<ChargeEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const charge = await this.getByIdWithError(id);

    return this.repoCharge.softRemove(charge);
  }
}
