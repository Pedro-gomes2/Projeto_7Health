import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Produto } from './produto/entities/produto.entity';

import { CategoriaModule } from './Categoria/categoria.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { UsuarioLogin } from './auth/entities/usuariologin.entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.modules';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }), 
    CategoriaModule,
    ProdutoModule,
    AuthModule,
    UsuarioModule

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }