import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pedido } from './entities/pedido.entity';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Produto } from '../produto/entities/produto.entity';
import { PedidoController } from './controller/pedido.controller';
import { PedidoService } from './service/pedido.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Usuario, Produto]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}