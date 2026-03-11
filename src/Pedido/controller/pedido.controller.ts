import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PedidoService } from "../service/pedido.service";
import { Pedido } from "../entities/pedido.entity";

@Controller('/pedidos')
export class PedidoController {

  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() pedido: Pedido) {
    return this.pedidoService.create(pedido);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.pedidoService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() pedido: Pedido) {
    return this.pedidoService.update(id, pedido);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.pedidoService.remove(id);
  }

}