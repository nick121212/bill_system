import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";

import { Public } from "@/common/decorators/public.decorator";

import { CustomerPriceRequest, CustomerQuery, CustomerRequest } from "./customer.interface";
import { CustomerService } from "./customer.service";

@Controller({
  path: ["customers"],
})
@Public()
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get("/")
  async all(@Query() query: CustomerQuery) {
    return this.customerService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.customerService.getById(id);
  }

  @Post("/")
  async create(@Body() body: CustomerRequest) {
    return this.customerService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: CustomerRequest) {
    return this.customerService.update(id, body);
  }

  @Get("/:id/products")
  async products(@Param("id") id: number) {
    return this.customerService.getPriceById(id);
  }

  @Post("/:id/products")
  async saveProducts(@Param("id") id: number, @Body() body: CustomerPriceRequest) {
    return this.customerService.savePrices(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.customerService.remove(id);
  }
}
