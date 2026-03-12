import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Produto } from './produto/entities/produto.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { UsuarioLogin } from './auth/entities/usuariologin.entities';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_7health',
      entities:[Categoria,Produto, Usuario,UsuarioLogin],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuarioModule,
    ProdutoModule,
    AuthModule,
    CategoriaModule,
  ],
})
export class AppModule {}