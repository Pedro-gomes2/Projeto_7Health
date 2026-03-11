import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './Pedido/pedido.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Produto } from './produto/entities/produto.entity';
import { Pedido } from './Pedido/entities/pedido.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_7health',
      entities:[Pedido,Produto, Usuario],
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsuarioModule,
    ProdutoModule,
    AuthModule,
    PedidoModule,
  ],
})
export class AppModule {}