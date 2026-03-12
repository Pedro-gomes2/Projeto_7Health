import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';



import { Usuario } from '../usuario/entities/usuario.entity';
import { Produto } from '../produto/entities/produto.entity';


import { CategoriaController } from './controller/categoriacontroller';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './service/categoria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Usuario, Produto]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}